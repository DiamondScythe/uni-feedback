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

const db = require("../db/posts")
const db2 = require("../db/ideas")

app.get("/test", (req, res) => {
    res.status(200).json({success: true});
});

app.post("/post", async (req, res) =>{
    const results = await db.createPost(req.body);
    res.status(201).json({id: results[0]});
})

app.post("/idea", async (req, res) =>{
    const results = await db2.createIdea(req.body);
    res.status(201).json({id: results[0]});
})

app.listen(8081, () => console.log("server is now running on port 8081"));