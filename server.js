const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const errorHandler = require("./middleware/errorMiddleware");
// Import cookie parser
const cookieParser = require("cookie-parser");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://mern-auth-template-tutorial.netlify.app",
    ],
    credentials: true,
  })
);

// Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the home page");
});

app.use(errorHandler);
const PORT = process.env.PORT || 5000;
// Connect DB & start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}...`);
    })
  )
  .catch((err) => console.log(err));
