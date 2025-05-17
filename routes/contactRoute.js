const express = require("express")
const router = express.Router()
const {getAllContacts, getSingleContact, createContact, updateContact, deleteContact} = require("../controllers/contactController")

//Fetch all the contacts
router.get('/api', getAllContacts)

//Fetch contact with id
router.get('/api/:id', getSingleContact)

//Create a contact
router.post('/api', createContact)


//Update a contact
router.put('/api/:id', updateContact)

//Delete a contact
router.delete('/api/:id', deleteContact)

module.exports = router
