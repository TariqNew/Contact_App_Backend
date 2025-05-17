const express = require("express");
const dotenv = require("dotenv").config();
const contactRoute = require("./routes/contactRoute");
const errorHandler = require("./middlewares/errorHandler");

const PORT = process.env.PORT || 8080;

// Create app function which acts as the entry point
const app = express();

// Body parser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Provide Route for the Contacts
app.use("/contact", contactRoute);

// Error handler middleware (must be after routes)
app.use(errorHandler);

// Start the Express server and listen on the defined PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
