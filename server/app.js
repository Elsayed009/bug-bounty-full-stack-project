require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookie_parser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookie_parser());
const dbconnection = require("./config/db");
dbconnection();
const PORT = process.env.PORT

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes)



app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});