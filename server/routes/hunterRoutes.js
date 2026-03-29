const express = require("express");
const router = express.Router();
const {validate,hunterProfileSchema } = require("../middleware/validation")
const {verifyToken} = require("../middleware/auth.middleware");
const { createProfile, getProfile, updateProfile, deleteProfile } = require("../controllers/hunterProfileController");
 router.post("/Profile",verifyToken,validate(hunterProfileSchema), createProfile);
 router.get("/Profile", verifyToken, getProfile);
 router.put("/Profile",verifyToken,validate(hunterProfileSchema), updateProfile);
 router.delete("/Profile", verifyToken, deleteProfile);

module.exports = router;