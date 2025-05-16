const express= require("express")
const dotenv = require("dotenv").config()

const PORT=process.env.PORT || 8080

const app = express()


//Fetch all the contacts
app.get('/contact/api',(req,res)=>{
    res.status(200).json({'message': 'All the contacts'})
})

//Fetch contact with id
app.get('/contact/api/:id',(req,res)=>{
    res.status(200).json({'message': 'The contact of the specific id'})
})

//Create a contact
app.post('/contact/api/',(req,res)=>{
    res.status(200).json({'message': 'The contact created'})
})


//Update a contact
app.put('/contact/api/:id',(req,res)=>{
    res.status(200).json({'message': 'The contact is updated'})
})

//Delete a contact
app.delete('/contact/api/:id',(req,res)=>{
    res.status(200).json({'message': 'The contact is deleted'})
})

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})