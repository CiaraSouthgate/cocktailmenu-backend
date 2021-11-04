const cocktailModel = require('../model/cocktailModel')

const getCocktails = (req, res) => {
  const availableOnly = req.query.available
  const getCocktails = availableOnly
    ? cocktailModel.getAllCocktails
    : cocktailModel.getAllAvailableCocktails
  getCocktails().then(([data, _]) => {
    if (data !== null) {
      res.status(200).json({ cocktails: data })
    } else {
      res.status(404).json({ message: 'No cocktails found' })
    }
  })
}

const getCocktailsForIngredient = (ingredientIds) => {
  cocktailModel.getCocktailsForIngredients(ingredientId).then(([data, _]) => {
    if (data !== null) {
      res.status(200).json({ cocktails: data })
    } else {
      res.status(404).json({ message: 'Ingredient not found' })
    }
  })
}
