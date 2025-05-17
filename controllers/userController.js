const asyncHandler = require("express-async-handler");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

//@desc Fetch All Users
//@route GET /api/users
//@access public
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany({
    include: { contacts: true },
  });
  res.status(200).json(users);
});

//@desc Fetch User with specific id
//@route GET /api/users/:id
//@access public
const getSingleUser = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(req.params.id) },
    include: { contacts: true },
  });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json(user);
});

//@desc Create a user
//@route POST /api/users
//@access public
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    res.status(400);
    throw new Error("Email already in use");
  }

  const user = await prisma.user.create({
    data: { name, email, password },
  });

  res.status(201).json(user);
});

//@desc Update a user
//@route PUT /api/users/:id
//@access public
const updateUser = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(req.params.id) },
  });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const updatedUser = await prisma.user.update({
    where: { id: parseInt(req.params.id) },
    data: req.body,
  });

  res.status(200).json(updatedUser);
});

//@desc Delete User
//@route DELETE /api/users/:id
//@access public
const deleteUser = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(req.params.id) },
  });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await prisma.user.delete({
    where: { id: parseInt(req.params.id) },
  });

  res.status(200).json({ message: `User with id ${req.params.id} deleted` });
});

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
