const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

//@desc Fetch All Users
//@route GET /api/users
//@access private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany({
    include: { contacts: true },
  });
  res.status(200).json(users);
});

//@desc Fetch User with specific id
//@route GET /api/users/:id
//@access private
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


//@desc Register a user
//@route POST /api/users/register
//@access private
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET || "defaultsecret",
    { expiresIn: "1d" }
  );

  res.status(201).json({
    message: "User registered successfully",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

//@desc Authenticate a user
//@route POST /api/users/login
//@access private
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET || "defaultsecret",
    { expiresIn: "1d" }
  );

  res.status(200).json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});


//@desc Update a user
//@route PUT /api/users/:id
//@access private
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
//@access private
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

//@desc logout a user
//@route POST /api/user/logout
//@access private
const logoutUser = (req, res) => {
  res.status(204).json({ message: 'Logged out successfully' });
};



module.exports = {
  getAllUsers,
  getSingleUser,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  logoutUser
};
