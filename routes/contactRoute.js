const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

// Fetch all contacts - GET /api/contact/
router.get("/", getAllContacts);

// Fetch contact with id - GET /api/contact/:id
router.get("/:id", getSingleContact);

// Create a contact - POST /api/contact/
router.post("/", createContact);

// Update a contact - PUT /api/contact/:id
router.put("/:id", updateContact);

// Delete a contact - DELETE /api/contact/:id
router.delete("/:id", deleteContact);

module.exports = router;
