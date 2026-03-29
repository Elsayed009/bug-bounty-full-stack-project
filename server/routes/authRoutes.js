    const express = require("express");
    const router = express.Router();
    const {register, login, me, logout}= require("../controllers/authController");
    const {verifyToken, verifyRole} = require("../middleware/auth.middleware");
    const {validate, registerSchema,loginSchema }= require("../middleware/validation");
// router.post("/register", register);
// router.post("/login", login);
router.post("/register",validate(registerSchema), register);
    router.post("/login", validate(loginSchema),login);
    router.get("/me",verifyToken, me); // securty check
    router.post("/logout", logout);
    //FOR TEST
//     router.get("/admin-test", verifyToken, verifyRole("admin"), (req, res) => {
//     res.status(200).json({ msg: "welcome admin" });
// });
    module.exports = router;














