const express = require("express");
const dotenv = require("dotenv").config();
const contactRoute = require("./routes/contactRoute");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middlewares/errorHandler");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount routes under /api prefix
app.use("/api/contact", contactRoute);
app.use("/api/user", userRoute);

// Error handling middleware (after routes)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
