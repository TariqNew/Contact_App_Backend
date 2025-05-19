const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authmiddleware");

// Fetch all users - GET /api/user/
router.get("/", getAllUsers);

// Fetch user with id - GET /api/user/:id
router.get("/:id", protect, getSingleUser);

// Register a user - POST /api/user/register
router.post("/register", registerUser);

// Authenticate a user - POST /api/user/login
router.post("/login", loginUser);

// Update a user - PUT /api/user/:id
router.put("/:id", updateUser);

// Delete a user - DELETE /api/user/:id
router.delete("/:id", deleteUser);

// Delete a user - DELETE /api/user/:id
router.delete("/logout", logoutUser);

module.exports = router;
