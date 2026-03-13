// 1. الملف ده محتاج إيه عشان يشتغل؟
// 2. هيعمل إيه بالظبط؟

const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

// verify the token of user before we send it to the controller to set the auth for this user
const verifyToken = async (req, res, next)=> {
    try{
        const token = req.cookies.token;
        if(!token) return res.status(401).json({msg: "no token, access denied"})
            // if we find token we verify it
        const decoded = jwt.verify(token, secret);
        
        req.userData = decoded; // create a proprty calld user in the req store user data from the token in it
        // userData is a proptry we created and pushed it to the requst obj beside the token proprty and others to store user data form the token
        next();

    }catch(err){
        res.status(401).json({
            msg: "invalid token",
             details: err.message
            });
    }
}


const verifyRole = (role)=>{ // this func dependes on the verifyToken func to run first cause it taks some info form it
    return (req, res, next)=>{
        if(req.userData.role !== role){
            return res.status(403).json({msg: "you r not authoraized"})
        }
        next();
    }
}



module.exports = { verifyToken, verifyRole };




// // Login — مش محتاج Middleware
// router.post("/login", loginController)
// // ← أي حد يقدر يعمل login
// // ← مش محتاج تتحقق من Token

// // Me — محتاج Middleware
// router.get("/me", verifyToken, meController)
// // ← لازم يكون عنده Token عشان يدخل
// // ← verifyToken بتتحقق الأول
// ```

// ---

// يعني القاعدة:
// ```
// Route مفتوح للكل   → Controller بس
// router.post("/login", loginController)

// Route محمي         → Middleware + Controller
// router.get("/me", verifyToken, meController)
// ```

// ---

// زي كده:
// ```
// باب المبنى   ← أي حد يدخل (login)
// الأوضة 5     ← لازم كارت دخول (me, admin)











// const verifyRole = (...allowedRoles) => {
//     return (req, res, next) => {
//         // req.user اتحطت فيه من verifyToken اللي اشتغل قبله
//         const userRole = req.user.role;

//         // هل الـ role بتاعه موجود في الـ allowedRoles؟
//         if (!allowedRoles.includes(userRole)) {
//             return res.status(403).json({ msg: "access denied, not authorized" });
//         }
//         // role تمام → كمل
//         next();
//     };
// };





// // إنت بس بتستقبلهم
// const verifyToken = (req, res, next) => {
//     // req و res و next جاهزين جوا
//     // مش محتاج تجيبهم من حتة
// }
// ```

// ---

// يعني القاعدة:
// ```
// لو بتستخدم package → محتاج require
// لو بتستقبل حاجة جاية من Express → مش محتاج require
