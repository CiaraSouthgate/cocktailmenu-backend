const dbSetup = require('./util/dbSetup')
const ingredientModel = require('./model/ingredientModel')
const cocktailModel = require('./model/cocktailModel')

dbSetup.init()
const createdData = {}
const categories = ['Liquor', 'Mixer', 'Garnish'].map(it => ({ categoryName: it }))
categories.forEach(category => {
  ingredientModel
    .createCategory(category.categoryName)
    .then(([data, _]) => {
      createdData[category.categoryName] = { id: data.insertId }
      const subcategories = {
        Liquor: ['Gin', 'Vodka', 'Scotch'],
        Mixer: ['Tonic', 'Juice']
      }
      Object.entries(subcategories).forEach(([catName, catList]) => {
        const category = createdData[catName]
        category.subcategories = []
        catList.forEach(item => {
          ingredientModel.createSubcategory(item, category.id).then(([data, meta]) => {
            category.subcategories.add({
              name: item,
              id: data.insertId
            })
          })
        })
      })
    })
    .catch(err => console.log(`Failed: ${err}`))
})
