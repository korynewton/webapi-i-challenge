const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json()); //for PUT and POST requests


server.get('/', (req, res) => {
    res.send('Working?')
});

//GET Users:
server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({ error: "The users information could not be retrieved." });
    })
})

//GET User by ID:
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    db.findById(id)
    .then(user => {
        if (user === undefined) {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
        res.status(200).json(user)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The user information could not be retrieved." })
    })
})

//POST new user:
server.post('/api/users', (req, res) => {
    const user = req.body

    if (!user.name || !user.bio) {
        return res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }

    db.insert(user)
    .then( usr => {
        res.status(201).json(usr)
    })
    .catch(err => {
        res.status(500).json({ error: "There was an error while saving the user to the database" })
    })
})


//Delete user by ID:
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    db.remove(id)
        .then( deleted => {
            console.log(deleted)
            if (deleted === 0) {
                return res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
            res.status(204).end()
        })
        .catch( err => {
            res.status(500).json({ error: "The user could not be removed" })
        })
})

//PUT request by ID:
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params
    const edits = req.body

    if (!edits.name || !edits.bio) {
        return res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }

    db.update(id, edits)
        .then( updated => {
            if (!updated) {
                return res.status(404).json( {message: "The user with the specified ID does not exist."} )
            } else {
                res.status(200).json(updated)
            }
        })
        .catch( err => {
            res.status(500).json({ error: "The user information could not be modified." })
        })
})

server.listen(4000, () => {
    console.log('\n** Project API up and running on port 4k **');
  });