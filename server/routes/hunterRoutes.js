const express = require("express");
const router = express.Router();
const {verifyToken} = require("../middleware/auth.middleware");
const { createProfile, getProfile, updateProfile, deleteProfile } = require("../controllers/hunterProfileController");
const {validate,hunterProfileSchema } = require("../middleware/validation")
 router.post("/profile", verifyToken,validate(hunterProfileSchema), createProfile);
 router.get("/profile", verifyToken, getProfile);
 router.put("/profile", verifyToken,validate(hunterProfileSchema), updateProfile);
 router.delete("/profile", verifyToken, deleteProfile);

module.exports = router;