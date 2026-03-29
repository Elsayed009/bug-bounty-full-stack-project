

const express = require("express");
const router = express.Router();
// call the peaceKeeper
// const isAdmin = require('../middlewares/isAdmin'); 
// router.use(isAdmin);


const {verifyToken, verifyRole} = require("../middleware/auth.middleware");
const {
    getAllCompanies,
    verifyCompany,
    getAllHunters,
    verifyHunter,
    getAllPrograms,
    toggleProgram,
    getAllReports,
    deleteReport
} = require("../controllers/adminController");

// companies
router.get("/companies", verifyToken, verifyRole("admin"), getAllCompanies);
router.put("/companies/:id", verifyToken, verifyRole("admin"), verifyCompany);

// hunters
router.get("/hunters", verifyToken, verifyRole("admin"), getAllHunters);
router.put("/hunters/:id", verifyToken, verifyRole("admin"), verifyHunter);

// programs
router.get("/programs", verifyToken, verifyRole("admin"), getAllPrograms);
router.put("/programs/:id", verifyToken, verifyRole("admin"), toggleProgram);

// reports
router.get("/reports", verifyToken, verifyRole("admin"), getAllReports);
router.delete("/reports/:id", verifyToken, verifyRole("admin"), deleteReport);

module.exports = router;



// ✅ W3-BE-01 → getAllCompanies + verifyCompany
// ✅ W3-BE-02 → getAllHunters + verifyHunter
// ✅ W3-BE-03 → getAllPrograms + toggleProgram
// ✅ W3-BE-04 → getAllReports + deleteReport
// ✅ W3-BE-05 → Reputation System