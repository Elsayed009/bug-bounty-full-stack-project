// first we need the model to deal with the database:
const CompanyPorfile = require("../models/CompanyProfile");
// curd HTTP Methods REST API

//  createProfile endpoint
const createProfile = async (req, res)=>{
    try{
        const {description, comName, website} = req.body;
        const userId = req.userData.id;
        const existingProfile = await CompanyPorfile.findOne({userId}) // search for profile data by userId
        if(existingProfile) return res.status(400).json({msg: "profile already exists"});
        // create user data email
        const data = await CompanyPorfile.create({comName, website, description, userId})
        res.status(201).json({msg: "done", data: data});
    }catch(err){
        console.log(err.message);
        res.status(500).json({ msg: "server down", details: err.message }); 

    }
}

// getProfile endpoint

const getProfile = async (req, res) => {
    try{
                // const {description, comName, website} = req.body; no use for it case user dosnt send any data  
        const userId = req.userData.id; // get the profile
        // check
        const profileData = await CompanyPorfile.findOne({userId});
        if(!profileData) return res.status(404).json({msg: "user not found"})
            res.status(200).json({msg: "data founded", data: profileData});
        }catch(err){
            console.log(err.message);
            res.status(500).json({ msg: "server down", details: err.message }); 
        }
    }

    //  updateProfile endpoint
    const updateProfile = async (req, res)=>{
        try{
            const {comName, description, website,} = req.body;
            const userId = req.userData.id;
            //search for profileData
            const profileData = await CompanyPorfile.findOne({userId});
            if (!profileData) return res.status(404).json({msg: "user not founded"});
            const updatedProfile = await CompanyPorfile.findOneAndUpdate(
                // arguments(3): 1 filter, 2 the updated data, the option arrg must be true to save the updated data and return it
                 {userId}, {comName, description, website}, {new: true} 
                );
            res.status(200).json({msg: "profile updated", data: updatedProfile});
        }catch(err){
         res.status(500).json({ msg: "server down", details: err.message }); 
        }
    }

    // endpoint 
    const deleteProfile = async (req, res)=>{
        try{
            const userId = req.userData.id
            // get profile data for check
            const profileData = await CompanyPorfile.findOne({userId});
            if(!profileData) return res.status(404).json({msg: 'user not founded'});
             await CompanyPorfile.findOneAndDelete({userId})// it take on arrg the deleted target id 
             // with out a var cause we dont need anything to be returned we just delete
            res.status(200).json({msg: "user deleted"})
        }catch(err){
         res.status(500).json({ msg: "server down", details: err.message }); 
        }
    }
module.exports= {
    createProfile,
    getProfile,
    updateProfile,
    deleteProfile
} 




// 200 → نجاح عام
// 201 → نجاح + إنشاء حاجة جديدة
// 400 → البيانات غلط
// 401 → مش متعرف عليك (مفيش Token)
// 403 → متعرف عليك بس مش مسموحلك
// 404 → الحاجة دي مش موجودة
// 500 → الـ server وقع



// findOneAndUpdate 

// دي بتاخد 3 arguments علطول — دي طبيعتها:

// 1. filter  → دور على مين؟
// 2. update  → عدّل بإيه؟
// 3. options → خيارات زي new: true
// الـ options مش إلزامية — بس لو مكتبتهاش مش هترجع البيانات الجديدة. 🎯

































// 201  success and created
// 2:03 PMبتقول لـ MongoDB:   
//       const existingProfile = await CompanyPorfile.findOne({userId})
// دور في كل الـ CompanyProfiles
// ← لو لاقيت واحد عنده نفس الـ userId ده
// ← ارجعهولي





// بتقول لـ MongoDB:
// اعمل document جديد في الـ CompanyProfiles collection
// ← وحط فيه الداتا دي:
//    comName     → اسم الشركة
//    website     → الموقع
//    description → الوصف
//    userId      → ربطه بالـ User ده

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

// const { userId } problem

// عشان req.userData ده object:
// javascriptreq.userData = { id: "64abc123", role: "company" }
// لما بتكتب { userId } بتدور على key اسمه userId — بس مش موجود!
// الموجود اسمه id مش userId:
// javascriptconst { userId } = req.userData; // ❌ مفيش key اسمه userId
// const userId = req.userData.id;  // ✅ الـ key اسمه id





// الـ destructuring يعني إنك بتفك الـ object وبتجيب منه القيم اللي عايزها:
// javascript// عندنا object
// const userData = { id: "123", role: "company" }

// // بدل ما تكتب كده
// const id = userData.id;
// const role = userData.role;

// // تقدر تكتب كده — ده الـ destructuring
// const { id, role } = userData;






