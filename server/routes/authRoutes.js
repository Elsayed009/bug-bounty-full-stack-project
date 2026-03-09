    const express = require("express");
    const router = express.Router();

    const {register, login, me, logout}= require("../controllers/authController");
    router.post("/register", register);
// // // بتقوله: لو جه POST على /register → روح على register function
    router.post("/login", login);
    router.get("/me", me);
    router.post("/logout", logout);
    module.exports = router;


// حلو هو بيعرف منين بقى انه يدخل على ال/auth/register

// 7:57 PM
// سؤال ممتاز! 

// ده هيتوضح لما نعمل الـ Route ونربطه في app.js:

// خطوة 1 — في authRoutes.js:

// javascript
// router.post("/register", register);
// // بتقوله: لو جه POST على /register → روح على register function
// خطوة 2 — في app.js:

// javascript
// app.use("/auth", authRoutes);
// // بتقوله: أي request يبدأ بـ /auth → روح على authRoutes
// ```

// **النتيجة:**
// ```
// POST /auth/register
//      ↓
// app.js شاف إنه بيبدأ بـ /auth → بعته لـ authRoutes
//      ↓
// authRoutes شاف إنه /register → بعته لـ register function
// يعني /auth بتيجي من app.js و /register بتيجي من authRoutes.js — الاتنين مع بعض بيعملوا /auth/register. 🎯





// const {register}= require("../controllers/authController");
//  ده معناه اي

// 8:09 PM
//  ده معناه:

// روح جيب من ملف authController.js
// الـ function اللي اسمها register بالظبط
// بنستخدم {} عشان في authController.js عملنا:

// javascript
// module.exports = { register };  // ← export object فيه register
// يعني لو مكتبناش {}:

// javascript
// const register = require("../controllers/authController");
// // ← هيجيب الـ object كله مش الـ function بس
// بس لما بنكتب {}:

// javascript
// const { register } = require("../controllers/authController");
// // ← بيجيب register بس من جوا الـ object
// ده اسمه Destructuring — نفس اللي عملناه مع req.body
















