const db = require('./database')

const createIngredientTable = () => {
  return db.execute(
    `CREATE TABLE IF NOT EXISTS ingredient(
        id              int             AUTO_INCREMENT NOT NULL,
        name            varchar(100)    NOT NULL DEFAULT '',
        category        varchar(100)    NOT NULL,
        subcategory     varchar(100),
        available       bool            NOT NULL DEFAULT FALSE,
      CONSTRAINT ingredient_pk PRIMARY KEY (id),
      CONSTRAINT ingredient_uk UNIQUE (name, category, subcategory)
    );`
  )
}

const createCocktailTable = () => {
  return db.execute(
    `CREATE TABLE IF NOT EXISTS cocktail(
        id          int             AUTO_INCREMENT NOT NULL,
        name        varchar(100)    NOT NULL UNIQUE,
        directions  varchar(5000),
      CONSTRAINT cocktail_pk PRIMARY KEY (id)
    );`
  )
}

const createCocktailIngredientTable = () => {
  return db.execute(
    `CREATE TABLE IF NOT EXISTS cocktail_ingredient(
        cocktailId      int            NOT NULL,
        ingredientId    int            NOT NULL,
        quantity        int            NOT NULL,
        unit            varchar(50)    NOT NULL,
      CONSTRAINT PRIMARY KEY (cocktailId, ingredientId),
      FOREIGN KEY (ingredientId) REFERENCES ingredient(id),
      FOREIGN KEY (cocktailId) REFERENCES cocktail(id) ON DELETE CASCADE
    );`
  )
}

module.exports = {
  init: () => {
    console.log('Initializing database...')
    createIngredientTable()
      .then(createCocktailTable())
      .then(createCocktailIngredientTable())
      .catch(err => {
        console.error(`Failed to create tables: ${err}`)
      })
    console.log('Initialization complete.')
  }
}
