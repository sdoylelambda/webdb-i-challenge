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

module.exports = server;