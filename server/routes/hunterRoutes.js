const express = require("express");
const router = express.Router();
const {verifyToken} = require("../middleware/auth.middleware");
const { createProfile, getProfile, updateProfile, deleteProfile } = require("../controllers/hunterProfileController");
 router.post("/Profile", verifyToken, createProfile);
 router.get("/Profile", verifyToken, getProfile);
 router.put("/Profile", verifyToken, updateProfile);
 router.delete("/Profile", verifyToken, deleteProfile);

module.exports = router;