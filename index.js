const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json()); //for PUT and POST requests

server.get('/', (req, res) => {
    res.send('Working?')
});

server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({ error: "The users information could not be retrieved." });
    })
})

server.listen(4000, () => {
    console.log('\n** Project API up and running on port 4k **');
  });