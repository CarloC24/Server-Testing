const express = require('express');
const server = express();
const dbModel = require('./dbmodel');
const db = require('./dbinit');

server.use(express.json());

server.get('/', (req, res) => {
  res.send('welcome to the testing api');
});

server.get('/db', async (req, res) => {
  const response = await dbModel.get();
  res.status(200).json(response);
});

server.get('/db/:id', async (req, res) => {
  const id = req.params.id;
  if (id) {
    const response = await dbModel.getById(id);
    res.status(200).json(response);
  } else {
    res.status(500).send('plug in a id');
  }
});

server.post('/db', async (req, res) => {
  const creds = req.body;
  if (creds) {
    try {
      const response = await dbModel.insert(creds);
      res.status(201).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json({ message: 'Bad request' });
  }
});

server.put('/db/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  if (body && id) {
    try {
      const response = await dbModel.update(id, body);

      res.status(204).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json({ message: 'Bad request' });
  }
});

server.delete('/db/:id', async (req, res) => {
  const { id } = req.params;

  if (id) {
    try {
      const response = await dbModel.delete(id);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).send('bad request');
  }
});

module.exports = server;
