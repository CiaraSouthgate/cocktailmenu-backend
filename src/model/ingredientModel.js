const db = require('../util/database')

const getAllIngredients = () => {
  return db.execute(`SELECT * FROM ingredient;`)
}

const getAllCategories = () => {
  return db.execute(`SELECT id, category FROM ingredient WHERE subcategory IS NULL AND name='';`)
}

const getAllSubcategories = () => {
  return db.execute(`SELECT id, subcategory FROM ingredient WHERE name='';`)
}

const getSubcategoriesForCategory = categoryId => {
  return db.execute(
    `SELECT id, subcategory FROM ingredient WHERE name='' AND category = (
        SELECT category FROM ingredient i2 WHERE i2.id=?
    );`,
    [categoryId]
  )
}

const getIngredientsInCategory = categoryId => {
  return db.execute(
    `SELECT * FROM ingredient WHERE category = (
        SELECT category FROM ingredient i2 WHERE i2.id=?
    );`,
    [categoryId]
  )
}

const getIngredientsInSubcategory = subcategoryId => {
  return db.execute(
    `SELECT * FROM ingredient WHERE subcategory = (
        SELECT subcategory FROM ingredient i2 WHERE i2.id=?
    );`,
    [subcategoryId]
  )
}

const createCategory = name => {
  return db.execute(`INSERT INTO ingredient (category) VALUES (?);`, [name])
}

const createSubcategory = (categoryId, name) => {
  return db.execute(
    `INSERT INTO ingredient (subcategory, category) 
    VALUES (?, (SELECT category FROM ingredient i2 WHERE i2.id=?));`,
    [name, categoryId]
  )
}

const createIngredient = (name, categoryId, subcategoryId, available) => {
  return db.execute(
    `INSERT INTO ingredient (name, available, category, subcategory)
     VALUES (?, ?, (
         SELECT category
         FROM ingredient i2
         WHERE i2.id=?
     ), (
         SELECT subcategory
         FROM ingredient i3
         WHERE i3.id=?
     ));`,
    [name, available, categoryId, subcategoryId]
  )
}

const updateCategory = (id, name) => {
  return db.execute(
    `UPDATE ingredient
     SET category=?
     WHERE category = (
         SELECT category
         FROM ingredient
         WHERE id=?
     );`,
    [name, id]
  )
}

const updateSubcategory = (id, name) => {
  return db.execute(
    `UPDATE ingredient SET subcategory=? WHERE subcategory = (
        SELECT subcategory FROM ingredient WHERE id=?
    )`,
    [name, id]
  )
}

const updateIngredient = (id, name, categoryId, subcategoryId, available) => {
  return db.execute(
    `UPDATE ingredient SET name=?, available=?, category=(
        SELECT category
        FROM ingredient i2
        WHERE i2.id=?
    ), subcategory=(
        SELECT subcategory
        FROM ingredient i3
        WHERE i3.id=?
    ) 
    WHERE id=?`,
    [name, available, categoryId, subcategoryId, id]
  )
}

const deleteIngredient = id => {
  return db.execute(`DELETE FROM ingredient WHERE id=?`, [id])
}

const deleteCategory = id => {
  return db.execute(
    `DELETE FROM ingredient WHERE category IN (SELECT category FROM ingredient WHERE id=?)`,
    [id]
  )
}

const deleteSubcategory = id => {
  return db.execute(
    `DELETE FROM ingredient WHERE subcategory IN (SELECT subcategory FROM ingredient WHERE id=?)`,
    [id]
  )
}

module.exports = {
  getAllIngredients,
  getIngredientsInCategory,
  getIngredientsInSubcategory,
  getAllCategories,
  getAllSubcategories,
  getSubcategoriesForCategory,
  createCategory,
  createSubcategory,
  createIngredient,
  updateIngredient,
  updateCategory,
  updateSubcategory,
  deleteIngredient,
  deleteCategory,
  deleteSubcategory
}
