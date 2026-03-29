
const express = require("express");
const router = express.Router();
const {verifyToken} = require("../middleware/auth.middleware");
const {validate,reportSchema,statusSchema } = require("../middleware/validation")
const { createReport, getReports, getReport, 
        companyUpdateReport, hunterUpdateReport } = require("../controllers/reportController");
router.post("/report/:id",verifyToken,validate(reportSchema), createReport); //Hunter
router.get("/report/:id",verifyToken, getReports); // Company
router.get("/report/single/:id",verifyToken, getReport); // Company
router.put("/report/company/:id",verifyToken,validate(statusSchema), companyUpdateReport); // Company
router.put("/report/hunter/:id",verifyToken,validate(reportSchema), hunterUpdateReport); //Hunter

module.exports = router;
