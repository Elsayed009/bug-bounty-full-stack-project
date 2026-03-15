// build Router steps
const express = require("express");
const router = express.Router();
const {verifyToken} = require("../middleware/auth.middleware");
const {createProfile, getProfile, updateProfile, deleteProfile} = require("../controllers/companyProfileController");
router.post("/profile",verifyToken, createProfile);
router.get("/profile",verifyToken, getProfile);
router.put("/profile",verifyToken, updateProfile);
router.delete("/profile",verifyToken, deleteProfile);
module.exports =  router;