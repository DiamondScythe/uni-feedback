console.log('Hello server')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require('./config/config')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)

app.post('/post2', (req, res) => {
    res.send({
        message: `Hello ${req.body.title}`
    })
})

sequelize.sync()
    .then(() => {
        app.listen(process.env.Port || 8081)
        console.log(`Server started on port ${config.port}`)
    })