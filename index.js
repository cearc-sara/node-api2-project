const express = require('express')


const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({api: "running", query: req.body});
})

const port = 4000;

server.listen(port, () => {
console.log(`\n***Server Running on http://localhost:4000 ***\n`)
})