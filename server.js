const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('welcome to the testing api');
});

server.post('/', (req, res) => {
  const { body } = req;
  res.json({ message: `${body} is the body` });
});

module.exports = server;
