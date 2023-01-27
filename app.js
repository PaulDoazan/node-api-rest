const express = require('express')
const favicon = require('serve-favicon')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

const app = express()
const port = 3000

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

sequelize.initDb()

// endpoints declaration
app.get('/', (req, res) => {
    res.send('Hello World')
})
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)

// errors handlers
app.use(({ res }) => {
    const message = 'Impossible de trouver la ressource demandee. Vous pouvez essayez une autre url.'
    res.status(404).json({ message })
})

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))