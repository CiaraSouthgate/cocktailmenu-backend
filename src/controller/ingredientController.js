const model = require('../model/ingredientModel')
const util = require('./controllerUtils')

const getIngredients = (req, res) => {
  const { category, subcategory } = req.query
  if (subcategory && !category) {
    res.status(400).json({ message: 'Category is required when querying by subcategory' })
    return
  }
  let promise
  if (category) {
    promise = subcategory
      ? model.getIngredientsInSubcategory(category, subcategory)
      : model.getIngredientsInCategory(category)
  } else promise = model.getAllIngredients()
  promise
    .then(([data]) => res.status(200).json({ ingredients: data }))
    .catch(err => res.status(500).json({ message: err }))
}

const getCategories = (_, res) => {
  model
    .getAllCategories()
    .then(([data]) => res.status(200).json({ categories: data }))
    .catch(err => res.status(500).json({ message: err }))
}

const getSubcategories = (req, res) => {
  const { category } = req.query
  const promise = category
    ? model.getSubcategoriesForCategory(category)
    : model.getAllSubcategories()
  promise
    .then(([data]) => {
      res.status(200).json({ subcategories: data })
    })
    .catch(err => res.status(500).json({ message: err }))
}

const createCategory = (req, res) => {
  const { name } = req.body
  if (!name.trim()) {
    res.status(400).json({ message: 'Name is required' })
  }
  model
    .createCategory(name)
    .then(([data]) => res.status(201).json({ id: data.insertId }))
    .catch(err => res.status(500).json({ message: err }))
}

const createSubcategory = (req, res) => {
  const { categoryId, name } = req.body
  if (!util.checkId(res, categoryId, 'Category ID is required')) return
  if (!util.checkRequiredFields(res, { name })) return
  model
    .createSubcategory(categoryId, name)
    .then(([data]) => res.status(201).json({ id: data.insertId }))
    .catch(err => {
      //TODO handle invalid category ID
      res.status(500).json({ message: err })
    })
}

const createIngredient = (req, res) => {
  const { name, categoryId, subcategoryId, available } = req.body
  if (!util.checkId(res, categoryId, 'Category ID is required')) return
  if (!util.checkRequiredFields(res, { name })) return
  model
    .createIngredient(name, categoryId, subcategoryId, available)
    .then(([data]) => {
      res.status(201).json({ id: data.insertId })
    })
    .catch(err => {
      //TODO handle invalid category ID
      res.status(500).json({ message: err })
    })
}

const updateIngredient = (req, res) => {
  const { id, name, categoryId, subcategoryId, available } = req.body
  if (!util.checkId(res, id)) return
  if (!util.checkId(res, categoryId, 'Category ID is required')) return
  if (!util.checkRequiredFields(res, { name })) return
  model
    .updateIngredient(id, name, categoryId, subcategoryId, available)
    .then(([data]) => {
      res.status(200).json({ id: data.insertId })
    })
    .catch(err => {
      //TODO handle invalid category ID
      res.status(500).json({ message: err })
    })
}

const updateCategory = (req, res) => {
  const { id, name } = req.body
  if (!util.checkId(res, id)) return
  if (!util.checkRequiredFields(res, { name })) return
  model
    .updateCategory(id, name)
    .then(([data]) => {
      res.status(200).json({ message: 'Updated successfully' })
    })
    .catch(err => {
      res.status(500).json({ message: err })
    })
}

const updateSubcategory = (req, res) => {
  const { id, name } = req.body
  if (!util.checkId(res, id)) return
  if (!util.checkRequiredFields(res, { name })) return
  model
    .updateSubcategory(id, name)
    .then(([data]) => {
      res.status(200).json({ message: 'Updated successfully' })
    })
    .catch(err => {
      res.status(500).json({ message: err })
    })
}

const deleteIngredient = (req, res) => {
  const id = req.query.id
  if (!util.checkId(res, id)) return
  model
    .deleteIngredient(id)
    .then(([data]) => {
      if (data.affectedRows !== 0) {
        res.status(200).send()
      } else {
        res.status(404).json({ message: 'Ingredient not found' })
      }
    })
    .catch(err => res.status(500).json({ message: err }))
}

const deleteCategory = (req, res) => {
  const id = req.query.id
  if (!util.checkId(res, id)) return
  model
    .deleteCategory(id)
    .then(([data]) => {
      if (data.affectedRows !== 0) {
        res.status(200).send()
      } else {
        res.status(404).json({ message: 'Category not found' })
      }
    })
    .catch(err => res.status(500).json({ message: err }))
}

const deleteSubcategory = (req, res) => {
  const id = req.query.id
  if (!util.checkId(res, id)) return
  model
    .deleteSubcategory(id)
    .then(([data]) => {
      if (data.affectedRows !== 0) {
        res.status(200).send()
      } else {
        res.status(404).json({ message: 'Subcategory not found' })
      }
    })
    .catch(err => res.status(500).json({ message: err }))
}

module.exports = {
  getIngredients,
  getCategories,
  getSubcategories,
  createIngredient,
  createCategory,
  createSubcategory,
  updateIngredient,
  updateCategory,
  updateSubcategory,
  deleteIngredient,
  deleteCategory,
  deleteSubcategory
}
