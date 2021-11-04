const model = require('../model/ingredientModel')

const getIngredients = (_, res) => {
  model.getAllIngredients().then(([data, _]) => {
    if (data !== null) {
      res.status(200).json({ ingredients: data })
    } else {
      res.status(404).json({ message: 'Ingredients not found' })
    }
  })
}

const getCategories = (_, res) => {
  model.getAllCategories().then(([data, _]) => {
    if (data !== null) {
      res.status(200).json({ ingredients: data })
    } else {
      res.status(404).json({ message: 'Categories not found' })
    }
  })
}

const getSubcategories = (_, res) => {
  model.getAllSubcategories().then(([data, _]) => {
    if (data !== null) {
      res.status(200).json({ ingredients: data })
    } else {
      res.status(404).json({ message: 'Subcategories not found' })
    }
  })
}

const createIngredient = (req, res) => {
  const { name, category, subcategory } = req.body
  const missingFields = checkMissingFields(name, category)
  if (missingFields.length !== 0) {
    res.status(400).json({ message: `Missing required field(s): ${missingFields}` })
    return
  }
  model
    .createIngredient(name, category, subcategory)
    .then(([data, meta]) => {
      if (data !== null) {
        res.status(201).json({ id: data.insertId })
      } else {
        res.status(500).json({ message: meta.message })
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err })
    })
}

const deleteIngredient = (req, res) => {
  const id = req.query.id
  if (!id.trim()) {
    res.status(400).json({ message: 'ID must be specified' })
    return
  }
  model.deleteIngredient(id).then(([data, _]) => {
    if (data !== null && data.affectedRows !== 0) {
      res.status(200).send()
    } else {
      res.status(404).json({ message: 'Delete failed - no matching rows found' })
    }
  })
}

const updateIngredient = (req, res) => {
  const { name, category, subcategory } = req.body
  const missingFields = checkMissingFields(name, category)
  if (missingFields.length !== 0) {
    res.status(400).json({ message: `Missing required field(s): ${missingFields}` })
    return
  }
  model
    .updateIngredient(name, category, subcategory)
    .then(([data, meta]) => {
      if (data !== null) {
        res.status(200).json({ id: data.insertId })
      } else {
        res.status(500).json({ message: meta.message })
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err })
    })
}

const checkMissingFields = (name, category) => {
  const missingFields = []
  if (!name.trim()) missingFields.push('name')
  if (!category.trim()) missingFields.push('category')
  return missingFields
}

module.exports = {
  getIngredients,
  getCategories,
  getSubcategories,
  createIngredient,
  deleteIngredient,
  updateIngredient
}
