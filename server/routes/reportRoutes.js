
const express = require("express");
const router = express.Router();
const {verifyToken} = require("../middleware/auth.middleware");

const { createReport, getReports, getReport, 
        companyUpdateReport, hunterUpdateReport } = require("../controllers/reportController");

router.post("/report/:id",verifyToken, createReport); //Hunter
router.get("/report/:id",verifyToken, getReports); // Company
router.get("/report/single/:id",verifyToken, getReport); // Company
router.put("/report/company/:id",verifyToken, companyUpdateReport); // Company
router.put("/report/hunter/:id",verifyToken, hunterUpdateReport); //Hunter

module.exports = router;
