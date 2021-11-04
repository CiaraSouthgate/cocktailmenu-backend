const db = require('./database')

const createIngredientCategoryTable = () => {
  return db.execute(
    `CREATE TABLE IF NOT EXISTS category(
        id      int             AUTO_INCREMENT PRIMARY KEY  NOT NULL,
        name    varchar(100)    NOT NULL UNIQUE
     );`
  )
}

const createIngredientSubcategoryTable = () => {
  return db.execute(
    `CREATE TABLE IF NOT EXISTS subcategory(
        id          int             AUTO_INCREMENT PRIMARY KEY  NOT NULL,
        categoryId  int,
        name        varchar(100)    NOT NULL UNIQUE,
      FOREIGN KEY (categoryId) REFERENCES category(id)
     );`
  )
}

const createIngredientTable = () => {
  return db.execute(
    `CREATE TABLE IF NOT EXISTS ingredient(
        id              int             AUTO_INCREMENT PRIMARY KEY NOT NULL,
        name            varchar(100)    NOT NULL UNIQUE,
        categoryId      int             NOT NULL,
        subcategoryId   int,
        available       bool            NOT NULL DEFAULT FALSE,
      FOREIGN KEY (categoryId) REFERENCES category(id),
      FOREIGN KEY (subcategoryId) REFERENCES subcategory(id)
    );`
  )
}

const createCocktailTable = () => {
  return db.execute(
    `CREATE TABLE IF NOT EXISTS cocktail(
        id          int             AUTO_INCREMENT PRIMARY KEY NOT NULL,
        name        varchar(100)    NOT NULL UNIQUE,
        directions  varchar(5000)
    );`
  )
}

const createCocktailIngredientTable = () => {
  return db.execute(
    `CREATE TABLE IF NOT EXISTS cocktail_ingredient(
        cocktailId      int            NOT NULL,
        ingredientId    int,
        categoryId      int,
        subcategoryId   int,
        quantity        int            NOT NULL,
        unit            varchar(50)    NOT NULL,
      FOREIGN KEY (ingredientId) REFERENCES ingredient(id),
      FOREIGN KEY (cocktailId) REFERENCES cocktail(id) ON DELETE CASCADE,
      FOREIGN KEY (categoryId) REFERENCES category(id),
      FOREIGN KEY (subcategoryId) REFERENCES subcategory(id),
      CHECK ( 
          (ingredientId IS NOT NULL AND categoryId IS NULL AND subcategoryId IS NULL) OR 
          (ingredientId IS NULL AND categoryId IS NOT NULL)
      )
    );`
  )
}

module.exports = {
  createTables: () => {
    createIngredientCategoryTable()
      .then(createIngredientSubcategoryTable())
      .then(createIngredientTable())
      .then(createCocktailTable())
      .then(createCocktailIngredientTable())
      .catch((err) => {
        console.log(`Failed to create tables: ${err}`)
      })
  }
}
