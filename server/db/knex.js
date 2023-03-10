const knex = require('knex');

const connectedKnex = knex({
    client: "sqlite3",
    connection: {
        filename: "test.sqlite3"
    }
})

module.exports = connectedKnex;