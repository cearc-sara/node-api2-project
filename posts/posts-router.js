const express = require('express')
const DB = require('../data/db')

const router = express.Router()

router.get("/", (req, res) => {
    DB.find(req.query)
    .then(posts => {
        res.status(200).json({ data: posts })
    })
    .catch(error => {
        res.status(500).json({error: "The posts information could not be retrieved"})
    })
})

router.get("/:id", async (req, res) => {
   try{
       const posts = await DB.findById(req.params.id)
       const post = posts[0]

        if(post) {
            res.status(200).json({ data: post })
        }else{
            res.status(404).json({ message: "The post with the specified ID does not exist."})
        }
    
    }catch(err) {
        console.log(err)
        res.status(500).json({ error: "The post information could not be retrieved"})
    }
})

router.get("/:id/comments", (req, res) => {
    DB.findPostComments(req.params.id)
    .then(comments => {
        if(comments) {
            res.status(200).json({ data: comments })
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
    DB.insert(req.body)
    .then(post => {
       if(post.title && post.contents) {
        res.status(201).json({ data: post })
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
    DB.findCommentById(req.params.id)
    DB.insertComment(req.body)
    .then(comment => {
        if(comment) {
            res.status(201).json({ data: comment })
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