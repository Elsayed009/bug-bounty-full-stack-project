// first we need the model to deal with the database:
const CompanyPorfile = require("../models/CompanyProfile");
 
const createProfile = async (req, res)=>{
    try{
        const {description, comName, website} = req.body;
        const userId = req.userData.id;
        const usrId = await User.findById(userId)
        if(!usrId) return res.status(400).json({msg: "user not found"})
    }catch(err){
        console.log(err.message);
    }
}












// لأ ده مش واضح خالص بصراحة
// انا ايه اللي خلاني اجيب دول من البدي 
// وليه مكتبتش الفريفايد
// وليه جيبت اليوزر أي دي من اليوزر داتا اي دي ليه يعني هو مربوط بأيه

// 9:23 PM
// تمام! خليني أبسطها:

// ليه comName, website, description من req.body؟

// عشان دي بيانات الشركة
// ← اليوزر هو اللي بيكتبها في الفورم
// ← وبيبعتها في الـ request
// ليه مكتبناش verified من req.body؟

// عشان لو كتبناها
// ← الشركة تقدر تبعت verified: true
// ← وتدخل من غير موافقة Admin
// ← ده خطر أمني
// ليه userId من req.userData مش من req.body؟

// عشان لو جبناها من req.body
// ← الشركة تقدر تكتب userId حد تاني
// ← وتعمل Profile بإسمه
// ← ده خطر أمني

// لكن req.userData
// ← جاي من الـ Token
// ← إحنا اللي عملناه في verifyToken
// ← مش اليوزر اللي بعته



// عشان req.userData ده object:
// javascriptreq.userData = { id: "64abc123", role: "company" }
// لما بتكتب { userId } ده destructuring — يعني بتدور على key اسمه userId جوا الـ object.
// بس إحنا سميناه id مش userId:
// javascriptconst { id } = req.userData;    // ✅ اسمه id
// const userId = req.userData.id; // ✅ كمان صح
// const { userId } = req.userData; // ❌ مفيش key اسمه userId