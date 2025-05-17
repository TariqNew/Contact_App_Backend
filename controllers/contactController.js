const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()


// @desc Fetch All Contacts
// @route GET /api/contacts
// @access private
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await prisma.contact.findMany({
    where: { userId: req.user.id },
  });
  res.status(200).json(contacts);
});

// @desc Fetch Contact by ID
// @route GET /api/contacts/:id
// @access private
const getSingleContact = asyncHandler(async (req, res) => {
  const contact = await prisma.contact.findUnique({
    where: { id: parseInt(req.params.id) },
  });

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.userId !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to access this contact");
  }

  res.status(200).json(contact);
});

// @desc Create a Contact
// @route POST /api/contacts
// @access private
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const contact = await prisma.contact.create({
    data: {
      name,
      email,
      phone,
      userId: req.user.id,
    },
  });

  res.status(201).json(contact);
});

// @desc Update a Contact
// @route PUT /api/contacts/:id
// @access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await prisma.contact.findUnique({
    where: { id: parseInt(req.params.id) },
  });

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.userId !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to update this contact");
  }

  const updatedContact = await prisma.contact.update({
    where: { id: contact.id },
    data: req.body,
  });

  res.status(200).json(updatedContact);
});

// @desc Delete a Contact
// @route DELETE /api/contacts/:id
// @access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await prisma.contact.findUnique({
    where: { id: parseInt(req.params.id) },
  });

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.userId !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to delete this contact");
  }

  await prisma.contact.delete({
    where: { id: contact.id },
  });

  res.status(200).json({ message: "Contact deleted successfully" });
});

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact,
};
