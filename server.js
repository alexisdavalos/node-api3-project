const express = require('express');
const helmet = require('helmet');
const cors = require('cors')
const server = express();

const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

const userDb = require('./users/userDb');
const postDb = require('./posts/postDb');

//middleware
server.use(express.json());
server.use(cors());
server.use(helmet());

// routes - endpoints
server.use("/api/user", logger, userRouter);
server.use("/api/post", postRouter);

// default base url http://localhost:5000 from index.js
server.get('/', logger,  (req, res) => {
  res.send(`<h2>Node API-III Project</h2>`);
});

module.exports = server;

//custom middleware

function logger(req, res, next) {
  (req.params.id) ? 
  console.log(`${req.method} Request to ${req.originalUrl} at: ${Date.now()} includes id:${req.params.id}`) :
  console.log(`${req.method} Request to ${req.originalUrl} at: ${Date.now()} `); //requests url of request method
  next(); //moves on
}

