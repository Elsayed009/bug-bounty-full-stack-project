const HunterProfile = require("../models/HunterProfile");
const Program = require("../models/Program");
const Report = require("../models/Report");

// error handler func
const errHandler= function (res, err){
    res.status(500).json({msg: "server dwon", details: err.message});
};

// createReport endpoint
const createReport = async (req, res) =>{
    try{
        const {title, description, severity, proofUrl} = req.body
        const hunterId = req.userData.id;
        const programId = req.params.id;
        const hunterData = await HunterProfile.findOne({userId: hunterId});
        if(!hunterData) return res.status(404).json({msg: "no hunter found"})
        const programData = await Program.findOne({programId});
        if(!programData) return res.status(404).json({msg: "no program found"})
        const report = await Report.create({
            title, description, severity, proofUrl, hunterId, programId
        });
        res.status(201).json({msg: "Report created", data: report});

    }catch(err){
        errHandler(res, err);
    };
};


// getReports endpoint

const getReports = async (req, res) =>{
    try{

    }catch(err){
        errHandler(res, err);
    };
};


// getReport endpoint

const getReport = async (req, res) =>{
    try{

    }catch(err){
        errHandler(res, err);
    };
};

// updateReport endpoint

const updateReport = async (req, res) =>{
    try{

    }catch(err){
        errHandler(res, err);
    };
};

module.exports= {
    createReport,
    getReport,
    getReports,
    updateReport
};






// يعني انا هنا بقوله ايه؟12:58 PMبتقوله:
// روح الـ HunterProfiles collection
// ← دور على document عنده userId = "USER123"
// ← يعني الـ Profile بتاع الـ Hunter ده


// عشان في الـ HunterProfile Model:
// userId: { type: ObjectId, ref: "User" }
//  ↑
// الـ field اسمه userId مش hunterId
// ```

// يعني:
// ```
// hunterId = "USER123"  ← ده الـ User._id
// findOne({userId: hunterId}) ← دور على Profile عنده userId = "USER123"


// تتبع دورة حياة الـ id
//  حتى الاندبوينت الحالي


// 1. POST /auth/register
//    Request:
//    { "name": "Ahmed", "email": "hunter@gmail.com", 
//      "password": "123456", "role": "hunter" }
   
//    MongoDB بيعمل:
//    { _id: "USER123", name: "Ahmed", role: "hunter", ... }
   
//    Response:
//    { "msg": "data created successfully" }
//    + Cookie: token=eyJ... 
//      ← جوا الـ Token: { id: "USER123", role: "hunter" }

// ━━━━━━━━━━━━━━━━━━━━━━

// 2. POST /auth/login
//    Request:
//    { "email": "hunter@gmail.com", "password": "123456" }
   
//    Response:
//    { "msg": "logged in successfully" }
//    + Cookie: token=eyJ...
//      ← جوا الـ Token: { id: "USER123", role: "hunter" }
//      ← نفس الـ USER123 اللي اتعمل في الـ register

// ━━━━━━━━━━━━━━━━━━━━━━

// 3. POST /hunter/profile
//    Request:
//    Cookie: token=eyJ...  ← فيه { id: "USER123" }
//    { "nickName": "hacker01", "skills": ["js"], "bio": "..." }
   
//    verifyToken:
//    ← فتحت الـ Token
//    ← req.userData = { id: "USER123", role: "hunter" }
   
//    MongoDB بيعمل:
//    { _id: "PROFILE123", userId: "USER123", nickName: "hacker01", ... }
//    ←                    ↑
//    ←              ربطه بـ USER123

//    Response:
//    { "msg": "user created", 
//      "data": { _id: "PROFILE123", userId: "USER123", ... } }

// ━━━━━━━━━━━━━━━━━━━━━━

// 4. POST /reports/program/PROGRAM123
//    Request:
//    Cookie: token=eyJ...  ← فيه { id: "USER123" }
//    { "title": "XSS Bug", "description": "...", 
//      "severity": "high", "proofUrl": "..." }
   
//    verifyToken:
//    ← req.userData = { id: "USER123", role: "hunter" }
   
//    Controller:
//    ← hunterId = req.userData.id = "USER123"
//    ← programId = req.params.id = "PROGRAM123"
   
//    MongoDB بيعمل:
//    { _id: "REPORT123", 
//      hunterId: "USER123",    ← نفس الـ USER123 من البداية
//      programId: "PROGRAM123",
//      status: "pending",
//      ... }

//    Response:
//    { "msg": "report created",
//      "data": { _id: "REPORT123", hunterId: "USER123", ... } }



// المرحلة 1: Register
// ━━━━━━━━━━━━━━━━━━━━━━
// مين أنشأ الـ ID؟
// ← MongoDB أنشأ _id: "USER123" أوتوماتيك

// ليه؟
// ← عشان يميز كل يوزر عن التاني
// ← زي رقم قومي

// لو معملناهوش؟
// ← مش هنعرف نفرق بين Ahmed و Mohamed

// ━━━━━━━━━━━━━━━━━━━━━━

// المرحلة 2: Token
// ━━━━━━━━━━━━━━━━━━━━━━
// مين أنشأه؟
// ← إحنا أنشأناه في authController:
//   jwt.sign({ id: "USER123", role: "hunter" })

// ليه حطينا USER123 جواه؟
// ← عشان في أي request جاي بعدين
// ← نعرف مين اللي بعته من غير ما يقولنا

// لو معملناهوش؟
// ← كل request هيبقى مجهول
// ← مش هنعرف مين بيعمل إيه

// ━━━━━━━━━━━━━━━━━━━━━━

// المرحلة 3: HunterProfile
// ━━━━━━━━━━━━━━━━━━━━━━
// مين أنشأ الـ userId جوا الـ Profile؟
// ← إحنا حطيناه من req.userData.id

// ليه جبناه من userData مش من غيره؟
// ← عشان هو موجود في الـ Token
// ← مش محتاج نروح الـ database عشان نجيبه

// ليه من UserSchema مش من HunterProfileSchema؟
// ← عشان الـ Token فيه User._id مش HunterProfile._id
// ← ده اللي اتعمل وقت الـ login

// لو معملناهوش؟
// ← الـ Profile هيتحفظ من غير ما يكون مربوط بأي User
// ← مش هنعرف ده بتاع مين

// ━━━━━━━━━━━━━━━━━━━━━━

// المرحلة 4: Report
// ━━━━━━━━━━━━━━━━━━━━━━
// مين أنشأ الـ hunterId؟
// ← إحنا حطيناه من req.userData.id

// ليه نفس الـ USER123 اللي من البداية؟
// ← عشان ده هو الـ Hunter نفسه
// ← مش محتاج نعمل حاجة جديدة

// ليه مش من HunterProfile._id؟
// ← ممكن نعمله كده بس:
//    ← هيحتاج query زيادة للـ database
//    ← والـ USER123 كافي عشان نعرف مين الـ Hunter

// لو معملناهوش؟
// ← الـ Report هيتحفظ من غير ما نعرف مين بعته
// ← مش هنقدر نديه الـ reputation بعدين





// المرحلة 1: Register
// ━━━━━━━━━━━━━━━━━━━━━━
// الكود:
// const data = await User.create({name, email, password: hashedPassword});

// بقوله إيه؟
// ← روح الـ Users collection في الـ database
// ← عمل document جديد فيه الداتا دي
// ← وارجعلي الـ document اللي اتعمل في data

// MongoDB بيرجع:
// { _id: "USER123", name: "Ahmed", email: "...", ... }
// ← الـ _id اتعمل أوتوماتيك

// ━━━━━━━━━━━━━━━━━━━━━━

// المرحلة 2: Token
// ━━━━━━━━━━━━━━━━━━━━━━
// الكود:
// const token = jwt.sign(
//     { id: data._id, role: data.role },
//     secret,
//     { expiresIn: "7d" }
// )

// بقوله إيه؟
// ← خد الداتا دي { id: "USER123", role: "hunter" }
// ← حطها جوا Token مشفر
// ← المفتاح بتاعه هو الـ secret
// ← وخليه يتنتهي بعد 7 أيام

// الكود:
// res.cookie("token", token, { httpOnly: true })

// بقوله إيه؟
// ← احفظ الـ Token ده في Cookie
// ← اسمها "token"
// ← ومتسمحش لـ JavaScript تقراها

// ━━━━━━━━━━━━━━━━━━━━━━

// المرحلة 3: HunterProfile
// ━━━━━━━━━━━━━━━━━━━━━━
// الكود:
// const userId = req.userData.id;

// بقوله إيه؟
// ← جيبلي الـ id اللي جوا الـ Token
// ← اللي verifyToken حطه في req.userData
// ← ده هو USER123

// الكود:
// const profile = await HunterProfile.create({
//     nickName, skills, bio, userId
// });

// بقوله إيه؟
// ← روح الـ HunterProfiles collection
// ← عمل document جديد
// ← وربطه بـ USER123 عشان نعرف ده بتاع مين

// ━━━━━━━━━━━━━━━━━━━━━━

// المرحلة 4: Report
// ━━━━━━━━━━━━━━━━━━━━━━
// الكود:
// const hunterId = req.userData.id;

// بقوله إيه؟
// ← جيبلي الـ id اللي جوا الـ Token
// ← ده نفس USER123 من البداية
// ← مش محتاج أدور عليه في الـ database

// الكود:
// const programId = req.params.id;

// بقوله إيه؟
// ← جيبلي الـ id اللي في الـ URL
// ← ده هو البرنامج اللي الـ Hunter عايز يبعت عليه Report

// الكود:
// const report = await Report.create({
//     title, description, severity, proofUrl,
//     hunterId, programId
// });

// بقوله إيه؟
// ← روح الـ Reports collection
// ← عمل document جديد
// ← اربطه بالـ Hunter بالـ hunterId
// ← واربطه بالـ Program بالـ programId
// ← والـ status هيبدأ بـ "pending" أوتوماتيك



// الخلاصة

// حلو بالمباديء دي كلها عايز اعرف احنا لما اخترنا نجيب الهانتر اي دي في الكود من اليوزر داتا 
// اشرحلي بقى بنقوله ايه واي الدنيا لو انت فاهمني


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