const db = require('../util/database')

const getAllIngredients = () => {
  return db.execute('SELECT * FROM ingredient')
}

const getAllCategories = () => {
  return db.execute('SELECT * FROM category')
}

const getAllSubcategories = () => {
  return db.execute('SELECT * FROM subcategory')
}

const getIngredientsInCategory = (categoryId) => {}

const createCategory = (name) => {
  return db.execute('INSERT INTO category (`name`) VALUES (?)', [name])
}

const createSubcategory = (name) => {
  return db.execute('INSERT INTO subcategory (`name`) VALUES (?)', [name])
}

const createIngredient = (name, categoryId, subcategoryId = null) => {
  return db.execute(
    'INSERT INTO `ingredient` (`name`, `categoryId`, `subcategoryId`) VALUES (?, ?, ?)',
    [name, categoryId, subcategoryId]
  )
}

const deleteIngredient = (id) => {
  return db.execute('DELETE FROM `ingredient` WHERE id = ?', [id])
}

const updateIngredient = (id, name, categoryId, subcategoryId) => {
  return db.execute(
    'UPDATE `ingredient` SET `name`=?, `categoryId`=?, `subcategoryId`=? WHERE `id`=?',
    [name, categoryId, subcategoryId, id]
  )
}

module.exports = {
  getAllIngredients,
  getAllCategories,
  getAllSubcategories,
  createCategory,
  createSubcategory,
  createIngredient,
  deleteIngredient,
  updateIngredient
}
