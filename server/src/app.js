console.log('Hello server')

const nodemailer = require('nodemailer');
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const sqlite3 = require('sqlite3').verbose()
require('dotenv').config(); 

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


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/email', async (req, res) => {
  try {
    const { email } = req.body; // destructed email value from request
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const msg = {
      from: `"Khuong" <${process.env.MAIL_USER}>`,
      to: 'khuongwhitelily@gmail.com',
      subject: 'Hello',
      html: '<b>Hello world?</b>',
    };

    const info = await transporter.sendMail(msg);

    console.log('Message sent: %s', info.messageId);

    res.send('Email Sent!');
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


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

//get total votes of an idea
app.get('/ideavotes', async (req, res) => {
  const { id } = req.query;
  const results = await db2.getAllIdeaVotes(id);
  if (results.length > 0){
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ message: 'No idea found with that ID was found' });
  }
})

//upvote and downvote idea
app.post('/voteIdea', async (req, res) => {
  const results = await db2.voteIdea(req.body);
  res.status(201)
})

app.listen(8081, () => console.log("server is now running on port 8081"));