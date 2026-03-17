const mongoose =require("mongoose");

const ReportSchema = new mongoose.Schema({
    hunterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true
    },
    programId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Program",
        required : true
    }, 
    title: {
        type: String,
        required : true,
        unique: true

    },
    description: {
        type: String,
        required : true,

    }, 
    severity: {
        type: String,
        enum: ["low", "medium", "high", "critical"],

    }, 
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",

    }, 
    proofUrl: {
        type: String,
        required : true

    }

}, {timestamps: true});

const Report = mongoose.model("Report", ReportSchema);
module.exports = Report;
















// طريقة 4 على الاتنين:
// hunterId:
// ← عايزين نعرف مين الـ Hunter اللي بعت الـ Report
// ← الـ Hunter موجود في User Model
// ← يبقى ref: "User"

// programId:
// ← عايزين نعرف الـ Report ده على أي برنامج
// ← البرنامج موجود في Program Model
// ← يبقى ref: "Program"
// الفرق:
// hunterId  → بيجاوب على "مين بعت الـ Report؟"
// programId → بيجاوب على "الـ Report ده على إيه؟"












// txt

// طب واي لازمة الid  هنا مجرد داتا بتتبعت يعني؟
// ولو هو مجرد داتا بتتبعت أنا ببعتها ليه وايه الفايدة وعشان ايه وليه ببعتها بالشكل ده

// 10:51 AM
// تمام! 😄

// الـ id مش مجرد داتا بتتبعت — ده هوية اليوزر:

// بدون id في الـ Token:
// ━━━━━━━━━━━━━━━━━━━━━━
// Hunter بعت Request على /reports
// ← السيرفر شاف الـ Token
// ← فتحه لاقى: { role: "hunter" }
// ← عرف إنه hunter ✅
// ← بس مش عارف مين الـ hunter ده ❌
// ← مش هيعرف يحفظ hunterId في الـ Report
// مع id في الـ Token:
// ━━━━━━━━━━━━━━━━━━━━━━
// Hunter بعت Request على /reports
// ← السيرفر شاف الـ Token
// ← فتحه لاقى: { id: "USER123", role: "hunter" }
// ← عرف إنه hunter ✅
// ← وعرف إنه بالتحديد USER123 ✅
// ← حفظ hunterId: "USER123" في الـ Report ✅
// يعني:

// role → بيقول "مين النوع"
// id   → بيقول "مين الشخص بالتحديد"
// الاتنين مع بعض = هوية كاملة. 🎯

// واضح؟ اكتب الكود! 🚀


// excerpt_from_previous_claude_message.txt
// 1 line

// txt

// اشرح الكود ده بالتفصيل يعني اي اللي الفرفاي توكن حطه في الريكوست يوزر داتا يعني ايه هو اللي حطه وحطه ازاي مش فاهم فهمني

// 10:53 AM
// تمام! 😄

// 1. Hunter بعت Request
//    ← المتصفح بعت الـ Cookie أوتوماتيك
//    ← Cookie فيها: token="eyJhbGci.USER123.hunter"

// 2. verifyToken اشتغلت:
// ━━━━━━━━━━━━━━━━━━━━━━
// const token = req.cookies.token;
// ← جابت الـ Token من الـ Cookie
// ← token = "eyJhbGci.USER123.hunter"

// const decoded = jwt.verify(token, secret);
// ← فتحت الـ Token
// ← decoded = { id: "USER123", role: "hunter" }

// req.userData = decoded;
// ← حطت الـ decoded في req.userData
// ← يعني req.userData = { id: "USER123", role: "hunter" }

// next();
// ← قالت "خلاص كمل للـ Controller"

// 3. Controller اشتغل:
// ━━━━━━━━━━━━━━━━━━━━━━
// const hunterId = req.userData.id;
// ← req.userData = { id: "USER123", role: "hunter" }
// ←                        ↑
// ←                    "USER123"
// يعني verifyToken عملت زي بواب:

// ← شاف الـ Token
// ← تحقق منه
// ← طلع البيانات منه
// ← حطها في req عشان الـ Controller يستخدمها
// واضح؟ 🚀


// excerpt_from_previous_claude_message.txt
// 1 line

// txt

// هو انا بستخدم التوكين اصلا في اي يعني اي الهدف منها 
// واي الهدف منها في المكان ده

// 10:56 AM
// الـ Token هدفه إنك متعملش login في كل request:

// بدون Token:
// ━━━━━━━━━━
// كل request محتاج تبعت email + password
// ← مش عملي
// ← مش آمن

// مع Token:
// ━━━━━━━━━
// عمل login مرة واحدة
// ← بياخد Token
// ← بيبعته مع كل request
// ← السيرفر بيعرفه من التوكين
// يعني:

// Token = "أنا عارفك إنت مين من غير ما تقولي كل مرة"
// في المكان ده بالتحديد:

// Hunter بعت Report
// ← السيرفر محتاج يعرف مين بعته
// ← مش هيطلب منه يكتب الـ ID بتاعه
// ← بيفتح الـ Token ويجيب الـ ID منه
// واضح؟ 🚀

// حلو بالمباديء دي كلها عايز اعرف احنا لما اخترنا نجيب الهانتر اي دي في الكود من اليوزر داتا 
// اشرحلي بقى بنقوله ايه واي الدنيا لو انت فاهمني

// 11:01 AM
// تمام! 😄

// const hunterId = req.userData.id;
// بنقوله:

// روح الـ request
// ← جيبلي الـ userData اللي verifyToken حطاه
// ← وجيبلي منه الـ id
// ← ده هو USER123 اللي:
//    - MongoDB عمله وقت Register
//    - اتحفظ في الـ Token وقت Login
//    - verifyToken طلعه من الـ Token دلوقتي
// يعني بسطر واحد:

// بنقوله: "جيبلي هوية اليوزر اللي بعت الـ Request ده"
// من غير ما:

// ❌ نطلب منه يكتب الـ ID
// ❌ ندور عليه في الـ database
// ❌ نعمل أي حاجة زيادة
// 🎯 واضح؟ اكتب الكود! 🚀

// Reinitialized existing Git repository in D:/EL work random/NodeTasks/.git/
// يعني ايه

// 11:40 AM
// يعني إنت عملت git init في فولدر عنده Git بالفعل! 😄

// git init → بيعمل Git repository جديد
//            لو موجود بالفعل → بيعمله Reinitialize
//            مش بيمسح حاجة ← الكود بتاعك سليم
// مش فيه مشكلة. 🎯

// اكتب الكود! 🚀

// يسطا اصحي يسطا جيميناي بياخد مكانك

// 12:29 PM
// 😄 مش هيعرف يقولك "اكتب الكود" بنفس الأسلوب!

// اكتب createReport! 🚀

// const HunterProfile = require("../models/HunterProfile");
// const Program = require("../models/Program");
// const Report = require("../models/Report");

// // error handler func
// const errHandler= function (res, err){
//     res.status(500).json({msg: "server dwon", details: err.message});
// };

// // createReport endpoint
// const createReport = async (req, res) =>{
//     try{
//         const {title, description, severity, proofUrl} = req.body
//         const hunterId = req.userData.id;
//         const programId = req.params.id;
//         const hunterData = await HunterProfile.findOne({hunterId});
//         if(!hunterData) return res.status(404).json({msg: "no hunter found"})
//         const programData = await Program.findOne({programId});
//         if(!programData) return res.status(404).json({msg: "no program found"})
//         const report = await Report.create({
//             title, description, severity, proofUrl, hunterId, programId
//         });
//         res.status(201).json({msg: "Report created", data: report});

//     }catch(err){
//         errHandler(res, err);
//     };
// };
// Show more
// 12:55 PM
// كويس! بس فيه 2 غلطات:

// 1. في findOne للـ HunterProfile:

// javascript
// HunterProfile.findOne({hunterId}) // ❌ مفيش field اسمه hunterId
// HunterProfile.findOne({userId: hunterId}) // ✅
// 2. في findOne للـ Program:

// javascript
// Program.findOne({programId}) // ❌ مفيش field اسمه programId
// Program.findById(programId)  // ✅
// صلحهم! 🚀


// excerpt_from_previous_claude_message.txt
// 1 line

// txt

// يعني انا هنا بقوله ايه؟

// 12:58 PM
// بتقوله:

// روح الـ HunterProfiles collection
// ← دور على document عنده userId = "USER123"
// ← يعني الـ Profile بتاع الـ Hunter ده
// عشان في الـ HunterProfile Model:

// javascript
// userId: { type: ObjectId, ref: "User" }
// //  ↑
// // الـ field اسمه userId مش hunterId
// ```

// يعني:
// ```
// hunterId = "USER123"  ← ده الـ User._id
// findOne({userId: hunterId}) ← دور على Profile عنده userId = "USER123"
// واضح؟ 🚀


// excerpt_from_previous_claude_message.txt
// 1 line

// txt

// هو ده شايل ايه جواه

// 1:04 PM
// شايل User._id بتاع الـ Hunter:

// HunterProfile:
// {
//     _id: "PROFILE123",
//     userId: "USER123",  ← ده User._id بتاع الـ Hunter
//     nickName: "hacker01",
//     ...
// }
// يعني userId ده الرابط بين الـ HunterProfile والـ User. 🎯

// صلح الكود! 🚀


// excerpt_from_previous_claude_message.txt
// 7 lines

// txt

// مين اللي قاله يشيل الحاجات دي

// 6:47 PM
// إحنا! 😄

// لما كتبنا الـ Model:

// javascript
// const HunterProfileSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     },
//     nickName: { ... },
//     ...
// })
// ولما كتبنا createProfile:

// javascript
// await HunterProfile.create({nickName, skills, bio, userId})
// //                                                   ↑
// //                                          إحنا حطيناه هنا
// يعني إحنا اللي حددنا في الـ Schema إن فيه field اسمه userId — وإحنا اللي حطينا فيه القيمة وقت الـ create. 🎯

// صلح الكود! 🚀

