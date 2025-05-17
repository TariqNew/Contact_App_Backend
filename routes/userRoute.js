const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// Fetch all users - GET /api/user/
router.get("/", getAllUsers);

// Fetch user with id - GET /api/user/:id
router.get("/:id", getSingleUser);

// Create a user - POST /api/user/
router.post("/", createUser);

// Update a user - PUT /api/user/:id
router.put("/:id", updateUser);

// Delete a user - DELETE /api/user/:id
router.delete("/:id", deleteUser);

module.exports = router;
