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
server.put('/:id', async(req, res) => {
    try {
        const data = await Data.update(req.params.id, req.body);
        if(data) {
            res.json({data});
        } else {
            res.status(404).json({ msg: 'Data not found.'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error updating.'});
    }
});


// Data.remove

server.delete('/:id', async(req, res) => {
    try {
        const count = await Data.remove(req.params.id);
        if (count > 0) {
            res.json({ msg: 'The data has been removed.' })
        } else {
            res.status(404).json({ msg: 'Data not found.'})
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Error deleting data.'});
    }
});


module.exports = server;