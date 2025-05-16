//@desc Fetch All Contacts
//@route GET /api
//@access public

const getAllContacts = (req,res)=>{
    res.status(200).json({'message': 'All the contacts'})
}


//@desc Fetch Contact with specific id
//@route POST /api/:id
//@access public

const getSingleContact = (req,res)=>{
    res.status(200).json({'message': `The contact with id ${req.params.id} is created`})
}

//@desc Create a contact
//@route POST /api
//@access public

const createContact = (req,res)=>{
    res.status(200).json({'message': `The contact with id ${req.params.id} is created`})
}

//@desc Update a contact
//@route PUT /api/:id
//@access public

const updateContact = (req,res)=>{
    res.status(200).json({'message': `The contact with id ${req.params.id} is updated`})
}

//@desc Delete Contact
//@route DELETE /api/:id
//@access public

const deleteContact = (req,res)=>{
    res.status(200).json({'message': `The contact with id ${req.params.id} is deleted`})
}

module.exports = {
    getAllContacts,
    getSingleContact,
    createContact,
    updateContact,
    deleteContact
}
