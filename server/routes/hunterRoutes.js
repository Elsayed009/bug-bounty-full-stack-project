const express = require("express");
const router = express.Router();
const {verifyToken} = require("../middleware/auth.middleware");
const { createProfile, getProfile, updateProfile, deleteProfile } = require("../controllers/hunterProfileController");
const {validate,hunterProfileSchema } = require("../middleware/validation")
 router.post("/Profile", verifyToken,validate(hunterProfileSchema), createProfile);
 router.get("/Profile", verifyToken, getProfile);
 router.put("/Profile", verifyToken,validate(hunterProfileSchema), updateProfile);
 router.delete("/Profile", verifyToken, deleteProfile);

module.exports = router;