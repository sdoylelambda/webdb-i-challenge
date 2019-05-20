const express = require('express');

const server = express();

const Data = require('./data/accounts-model');

server.use(express.json());

server.get('/', async (req, res) => {
        try {
            const data = await Data.find();
            res.json(data);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'The data could not be found.'});
        }
});

server.get('/:id', async(req, res) =>{
    try {
        const data = await Data.findById(req.params.id);
        if (data) {
            res.json(data);
        } else {
            res.status(404).json({ msg: 'Data not found.'})
        }
    } catch (error) {
        console.log(error) 
            res.status(500).json({ msg: 'The ID does not exist.'});
    }
});

// Data.add

server.post('/', async(req, res) => {
    // const info = { req.body }
    try {
        const msg = await Data.add(req.body)
        res.status(201).json(msg);
    } catch (error) {
        res.status(404).json({ err: 'The message could not be posted.'});
    }
});




// Data.update
// Data.remove
module.exports = server;