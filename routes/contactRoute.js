const express = require("express")
const router = express.Router()

//Fetch all the contacts
router.get('/api',(req,res)=>{
    res.status(200).json({'message': 'All the contacts'})
})

//Fetch contact with id
router.get('/api/:id',(req,res)=>{
    res.status(200).json({'message': `The contact with id ${req.params.id}`})
})

//Create a contact
router.post('/api/:id',(req,res)=>{
    res.status(200).json({'message': `The contact with id ${req.params.id} is created`})
})


//Update a contact
router.put('/api/:id',(req,res)=>{
    res.status(200).json({'message': `The contact with id ${req.params.id} is updated`})
})

//Delete a contact
router.delete('/api/:id',(req,res)=>{
    res.status(200).json({'message': `The contact with id ${req.params.id} is deleted`})
})

module.exports = router
