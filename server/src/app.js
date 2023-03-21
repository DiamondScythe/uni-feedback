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

app.post("/ideas", async (req, res) =>{
    const results = await db2.createIdea(req.body);
    res.status(201).json({id: results[0]});
})

//get all ideas from database
app.get("/ideas", async (req, res) =>{
    const results = await db2.getAllIdeas();
    res.status(200).json({ideas: results});
})

app.get("/categories", async (req, res) =>{
    const results = await db2.getAllCategories();
    res.status(200).json({categories: results});
})

//get idea details
//ex: get req is http://localhost:8081/details?id=5
//this will get details of post at id = 5
//you can add multiple params like this:
//  /details?param1=value1&param2=value2
app.get('/details', async (req, res) => {
    const { id } = req.query;
    const results = await db2.getIdeaDetails(id);
    if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).json({ message: 'No idea found with that ID' });
      }
  });

//post comments
app.post('/comments', async (req, res) => {
    const results = await db2.createComment(req.body)
    res.status(201)
})

//get comments from idea id
app.get('/comments', async (req, res) => {
    const { ideaId } = req.query;
    const results = await db2.getComments(ideaId);
    if (results.length > 0) {
        res.status(200).json(results);
      } else {
        res.status(404).json({ message: 'No comments found with that idea ID' });
      }
})

//delete idea
app.delete('/ideas', async (req, res) => {
    const { id } = req.query;
    const results = await db2.deleteIdea(id);
    if (results) {
        res.status(204).send()
      } else {
        res.status(404).json({ message: 'No idea found with that ID was found' });
      }
})


app.listen(8081, () => console.log("server is now running on port 8081"));