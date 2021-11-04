const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const dbSetup = require('./util/dbSetup')

const PORT = process.env.PORT || 3000

dbSetup.createTables()

const app = express()
