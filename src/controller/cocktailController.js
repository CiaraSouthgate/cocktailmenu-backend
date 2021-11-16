const cocktailModel = require('../model/cocktailModel')

const getCocktails = (req, res) => {
  const availableOnly = req.query.available
  const getCocktails = availableOnly
    ? cocktailModel.getAllCocktails
    : cocktailModel.getAllAvailableCocktails
  getCocktails().then(([data]) => {
    if (data !== null) {
      res.status(200).json({ cocktails: data })
    } else {
      res.status(404).json({ message: 'No cocktails found' })
    }
  })
}

const getCocktailsForIngredients = (req, res) => {
  const { ingredientIds, categoryIds, subcategoryIds } = req.body
  cocktailModel
    .getCocktailsForIngredients(ingredientIds, categoryIds, subcategoryIds)
    .then(([data]) => {
      if (data !== null) {
        res.status(200).json({ cocktails: data })
      } else {
        res.status(404).json({ message: 'Ingredient not found' })
      }
    })
}

const createCocktail = (req, res) => {
  const { name, ingredientIds, directions } = res.body
  cocktailModel.createCocktail(name, directions).then(([data]) => {
    if (data !== null) {
      const cocktailId = data.insertId
      cocktailModel.addCocktailIngredients(cocktailId, ingredientIds).then(([data]) => {
        if (data !== null) {
          res.status(201).json({ id: cocktailId })
          return
        }
      })
    }
    res.status(500).json()
  })
}

module.exports = {
  getCocktails
}
