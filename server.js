const express = require("express");
const dotenv = require("dotenv").config();
const contactRoute = require("./routes/contactRoute");

const PORT = process.env.PORT || 8080;

const app = express();

//Provide Route for the Contacts
app.use("/contact", contactRoute);

// Start the Express server and listen on the defined PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
