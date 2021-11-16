const db = require('../util/database')

const getAllCocktails = () => {
  return db.execute(
    `SELECT
        cocktailId, 
        ingredientId, 
        co.name AS cocktailName, 
        i.name AS ingredientName,
        ca.name as categoryName,
        s.name as subcategoryName,
        quantity, 
        unit 
      FROM cocktail co
        LEFT JOIN cocktail_ingredient ci on co.id = ci.cocktailId
        LEFT JOIN ingredient i on ci.ingredientId = i.id
        LEFT JOIN category ca on ci.categoryId = ca.id
        LEFT JOIN subcategory s on ca.id = s.categoryId`
  )
}

const getAllAvailableCocktails = () => {
  return db.execute(
    `SELECT
      cocktailId, 
      ingredientId, 
      co.name AS cocktailName, 
      i.name AS ingredientName,
      ca.name as categoryName,
      s.name as subcategoryName,
      quantity, 
      unit
    FROM cocktail co
      LEFT JOIN cocktail_ingredient ci on co.id = ci.cocktailId
      LEFT JOIN ingredient i on ci.ingredientId = i.id
      LEFT JOIN category ca on ci.categoryId = ca.id
      LEFT JOIN subcategory s on ca.id = s.categoryId
    WHERE cocktailId NOT IN (
      SELECT cocktailId FROM cocktail_ingredient ci2 
        LEFT JOIN ingredient i2 on ci2.ingredientId = i2.id
        WHERE i2.available IS FALSE
    )`
  )
}

const getCocktailsForIngredients = (ingredientIds, categoryIds, subcategoryIds) => {
  return db.execute(
    `SELECT 
        cocktailId,
        ingredientId,
        co.name as cocktailName,
        i.name as ingredientName,
        ca.name as categoryName,
        s.name as subcategoryName,
        quantity,
        unit
      FROM ingredient i
        LEFT JOIN cocktail_ingredient ci on i.id = ci.ingredientId 
        LEFT JOIN cocktail co on ci.cocktailId = co.id
        LEFT JOIN category ca on ci.categoryId = ca.id
        LEFT JOIN subcategory s on ca.id = s.categoryId
      WHERE co.id NOT IN (SELECT * FROM cocktail_ingredient ci2 WHERE ci2.ingredientId NOT IN ?)
        AND co.id NOT IN (
          SELECT * FROM cocktail_ingredient ci3
            LEFT JOIN ingredient i2 ON ci3.ingredientId = i2.id
            WHERE categoryId NOT IN ?
        )
        AND co.id NOT IN (
          SELECT * FROM cocktail_ingredient ci4
            LEFT JOIN ingredient i3 on ci4.ingredientId = i3.id
            WHERE subcategory NOT IN ?
          )`,
    [ingredientIds, categoryIds, subcategoryIds]
  )
}

const createCocktail = (name, directions) => {
  return db.execute('INSERT INTO `cocktail` (`name`, `directions`) VALUES (?, ?)', [
    name,
    directions
  ])
}

const addCocktailIngredients = (cocktailId, ingredientIds) => {
  return db.execute('INSERT INTO `cocktail_ingredient` VALUES ?', [
    ingredientIds.map((ingredientId) => [cocktailId, ingredientId])
  ])
}

const deleteCocktailIngredients = (cocktailId, ingredientIds) => {
  return db.execute('DELETE FROM `cocktail_ingredient` WHERE ingredientId IN ?', [ingredientIds])
}

const deleteCocktail = (id) => {
  return db.execute('DELETE FROM `cocktail` WHERE ID = ?', [id])
}

const updateCocktail = (id, name, directions) => {
  return db.execute('UPDATE `cocktail` SET `name`=?, `directions`=? WHERE ID = ?', [
    name,
    directions,
    id
  ])
}

module.exports = {
  getAllCocktails,
  getAllAvailableCocktails,
  getCocktailsForIngredients,
  createCocktail,
  addCocktailIngredients,
  deleteCocktailIngredients,
  deleteCocktail,
  updateCocktail
}
