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

app.get("/ideas", async (req, res) =>{
    const results = await db2.getAllIdeas();
    res.status(201).json({ideas: results});
})

app.get("/categories", async (req, res) =>{
    const results = await db2.getAllCategories();
    res.status(201).json({categories: results});
})

//get idea details
app.get('/details', async (req, res) => {
    const { id } = req.query;
    const results = await db2.getIdeaDetails(id);
    if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).json({ message: 'No idea found with that ID' });
      }
  });

app.listen(8081, () => console.log("server is now running on port 8081"));