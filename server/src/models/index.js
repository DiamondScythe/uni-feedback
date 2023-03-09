const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}
const currentPath = path.join(path.resolve(path.dirname('')), '/src/models')

const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
)

fs
    .readdirSync(currentPath)
    .filter((file) =>
        file !== 'index.js')
    .forEach((file) => {
        const model = sequelize.define(path.join(currentPath, file))
        db[model.name] = model
    })

db.sequelize = sequelize
db.Sequelize = Sequelize

console.log(currentPath)

module.exports = db