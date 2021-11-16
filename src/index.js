const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const constants = require('./util/constants')
const dbSetup = require('./util/dbSetup')
const cocktail = require('./controller/cocktailController')
const ingredient = require('./controller/ingredientController')

const PORT = process.env.PORT || 3000
const path = constants.API_PATH

dbSetup.init()

const ingredients = `${path}/ingredients`
const cocktails = `${path}/cocktails`
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get(cocktails, cocktail.getCocktails)

//TODO auth

app.get(ingredients, ingredient.getIngredients)
app.get(`${ingredients}/categories`, ingredient.getCategories)
app.get(`${ingredients}/subcategories`, ingredient.getSubcategories)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`)
})
