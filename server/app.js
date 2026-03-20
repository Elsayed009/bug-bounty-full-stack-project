require("dotenv").config();

//  W1-BE-01 → Project Setup
//  W1-BE-02 → User Model
//  W1-BE-03 → Register
//  W1-BE-04 → Login
//  W1-BE-05 → Me + Logout

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
const PORT = process.env.PORT;

//Routes

// aut linking
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);
// company router linking
const companyRoutes = require("./routes/companyProfileRoutes")
app.use("/company", companyRoutes)
// hunter router linking
const hunterRoutes = require("./routes/hunterRoutes");
app.use("/hunter", hunterRoutes);
//program
const programRoutes = require("./routes/programRoutes");
app.use("/programs", programRoutes)
// report
const reportRoutes = require("./routes/reportRoutes");
app.use("/reports", reportRoutes);

// run port app
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});