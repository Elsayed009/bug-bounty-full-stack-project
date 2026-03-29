// build Router steps
const express = require("express");
const router = express.Router();
const {validate,companyProfileSchema } = require("../middleware/validation")
const {verifyToken} = require("../middleware/auth.middleware");
const {createProfile, getProfile, updateProfile, deleteProfile} = require("../controllers/companyProfileController");
router.post("/profile",verifyToken,validate(companyProfileSchema), createProfile);
router.get("/profile",verifyToken, getProfile);
router.put("/profile",verifyToken,validate(companyProfileSchema), updateProfile);
router.delete("/profile",verifyToken, deleteProfile);
module.exports =  router;