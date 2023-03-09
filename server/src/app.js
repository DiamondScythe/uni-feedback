console.log('Hello server')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const sqlite3 = require('sqlite3').verbose()

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

let sql;

const db = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE, (err)=>{
    if (err) return console.error(err.message);
});

// sql = 'CREATE TABLE users(id INTEGER PRIMARY KEY, first_name, last_name, username, password, email)';
// db.run(sql);

sql = 'INSERT INTO users(first_name,last_name,username,password,email) VALUES (?,?,?,?,?)'
db.run(sql,["mike", "lol", "diamond", "1as2", "abc@gmail.com"],(err)=>{
    if (err) return console.error(err.message);
})