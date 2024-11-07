require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const adminauthRoute = require("./routes/adminauth")
const admindashRoute = require("./routes/admindash")
const PORT = process.env.PORT || 3009

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/adminauth",adminauthRoute);
app.use("/api/admindash",admindashRoute);

app.listen(PORT, console.log(`Listening on port ${PORT}...`));