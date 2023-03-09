module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || 'unifeedback',
        user: process.env.DB_USER || 'unifeedback',
        password: process.env.DB_PASS || 'unifeedback',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.HOST || 'localhost',
            storage: './unifeedback.sqlite'
        }
    }
}