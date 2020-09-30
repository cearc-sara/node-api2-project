const express = require('express')
const DB = require('./db')

const router = express.Router()

router.get("/", (req, res) => {
    DB.find(req.query)
    .then(db => {
        res.status(200).json(db)
    })
    .catch(error => {
        res.status(500).json({error: "The posts information could not be retrieved"})
    })
})

router.get("/:id", (req, res) => {
    DB.findById(req.params.id)
    .then(db => {
        if(db) {
            res.status(200).json(db)
        }else{
            res.status(404).json({ message: "The post with the specified ID does not exist."})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The post information could not be retrieved"})
    })
})

router.get("/:id/comments", (req, res) => {
    DB.findById(req.params.id)
    .then(db => {
        if(db) {
            res.status(200).json(db)
        }else{
            res.status(404).json({ message: "The post with the specified ID does not exist"})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The comments information could not be retrieved"})
    })
})

router.post("/", (req, res) => {
    DB.add(req.body)
    .then(db => {
       if(db) {
        res.status(201).json(db)
       } else{
           res.status(400).json({ errorMessage: "Please provide title and contents for the post."})
       }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "There was an error while saving the post to the database"})
    })
})

router.post("/:id/comments", (req, res) => {
    DB.findById(req.params.id)
    DB.add(req.body)
    .then(db => {
        if(db) {
            res.status(201).json(db)
        }else{
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "There was an error while saving the comment to the database"})
    })
})

router.delete("/:id", (req, res) => {
    DB.remove(req.params.id)
    .then(count => {
        if(count > 0){
            res.status(200).json({ message: "The db has been nuked"})
        }else{
            res.status(404).json({ message: "The post with the specified ID does not exist"})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The post could not be removed"})
    })
})

router.put("/:id", (req, res) => {
    const changes = req.body
    DB.update(req.params.id, changes)
    .then(db => {
        if(db) {
            res.status(200).json(db)
        }else{
            res.status(404).json({ message: "The post with the specified ID does not exist."})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The post information could not be modified"})
    })
})

module.exports = router