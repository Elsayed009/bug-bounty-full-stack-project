const mongoose = require("mongoose");
const URL = process.env.MONGO_URI;

async function  dbConnection(){
    try{
       await mongoose.connect(URL);
       console.log("database connected well");
    }catch(err){
        console.log(err.message);
    }

}
module.exports= dbConnection;






const CompanyProfile = require("../models/CompanyProfile");
const HunterProfile = require("../models/HunterProfile");
const Program = require("../models/Program");
const Report = require("../models/Report");

const errHandler = function (res, err){
    res.status(500).json({msg: "server dwon", details: err.message});
};


// getAllCompanies endpoint
const getAllCompanies = async (req, res)=>{
    try{
    
        const { verified: queryVerified } = req.query;
        const filter = queryVerified ? { verified: queryVerified === "true" } : {};
        const companies = await CompanyProfile.find(filter);
        if(companies.length === 0) return res.status(404).json({msg: "no companies found"});
        res.status(200).json({msg: "companies found", data: companies});
    }catch(err){
        errHandler(res, err);
    }
}
const verifyCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await CompanyProfile.findById(companyId);
        if(!company) return res.status(404).json({msg: "company not found"});
        const updated = await CompanyProfile.findByIdAndUpdate(
            companyId,
            {$set: {verified: true}},
            {new: true}
        );
        res.status(200).json({msg: "company verified", data: updated});
    } catch(err) {
        errHandler(res, err);
    }
}
// getAllHunters endpoint
const getAllHunters = async (req, res)=>{
    try{
        const { verified: queryVerified } = req.query;
        const filter = queryVerified ? { verified: queryVerified === "true" } : {};
        const hunters = await HunterProfile.find(filter);
        if(hunters.length === 0) return res.status(404).json({msg: "no hunters found"});
        res.status(200).json({msg: "hunters found", data: hunters});
    }catch(err){
        errHandler(res, err);
    }
}

// verifyHunter endpoint
const verifyHunter = async (req, res) => {
    try {
        const hunterId = req.params.id;
        const hunter = await HunterProfile.findById(hunterId);
        if(!hunter) return res.status(404).json({msg: "hunter not found"});
        const updated = await HunterProfile.findByIdAndUpdate(
            hunterId,
            {$set: {verified: true}},
            {new: true}
        );
        res.status(200).json({msg: "hunter verified", data: updated});
    } catch(err) {
        errHandler(res, err);
    }
}

// getAllPrograms endpoint
const getAllPrograms = async (req, res)=>{
    try{
        const programs = await Program.find();
        if(programs.length === 0) return res.status(404).json({msg: "no programs found"});
        res.status(200).json({msg: "programs found", data: programs});
    }catch(err){
        errHandler(res, err);
    }
}



// toggleProgram endpoint
const toggleProgram = async (req, res) => {
    try {
        const programId = req.params.id;
        const program = await Program.findById(programId);
        if(!program) return res.status(404).json({msg: "program not found"});
        const updated = await Program.findByIdAndUpdate(
            programId,
            {$set: {isActive: !program.isActive}},
            {new: true}
        );
        res.status(200).json({msg: `program ${updated.isActive ? "activated" : "deactivated"}`, data: updated});
    } catch(err) {
        errHandler(res, err);
    }
}

// getAllReports endpoint
const getAllReports = async (req, res)=>{
    try{
        const reports = await Report.find();
        if(reports.length === 0) return res.status(404).json({msg: "no reports found"});
        res.status(200).json({msg: "reports found", data: reports});
    }catch(err){
        errHandler(res, err);
    }
};

// deleteReport endpoint
const deleteReport = async (req, res) => {
    try {
        const reportId = req.params.id;
        const report = await Report.findById(reportId);
        if(!report) return res.status(404).json({msg: "report not found"});
        await Report.findByIdAndDelete(reportId);
        res.status(200).json({msg: "report deleted"});
    } catch(err) {
        errHandler(res, err);
    }
}
module.exports = {
    getAllCompanies,
    verifyCompany,
    getAllHunters,
    verifyHunter,
    getAllPrograms,
    toggleProgram,
    getAllReports,
    deleteReport
}







const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET


// register endpoint
const register = async (req, res) =>{
    try{
        // get data from body
        const {name, email,password, role } = req.body;
        // check if its a new user or not
        const userEmail = await User.findOne({email});
        if(userEmail) return res.status(400).json({msg: "email already exists"});
        // encrypt password
        const cryptSalt = await bcrypt.genSalt(10);  // randome num for more security 
        // const hashedPassword = bcrypt.hash(password, 10);
        const hashedPassword = await bcrypt.hash(password, cryptSalt);
        // const data = await User.create({name(create this field and its name is name):name(the value of the name field taken from req.body or any other way like the hashed password), email: email, password: hashedPassword});
        const data = await User.create({name, email, password: hashedPassword, role});
        //token
        const token = jwt.sign(
            { id: data._id, role: data.role },  
            secret,              
            { expiresIn: "7d" }  )   
            //refreshed token     
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 7*24*60*60*1000
                // secure: process.env.NODE_ENV === 'production', // true in production, false in local
                // sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
            });
            res.status(201).json({msg: "data created seccussfuly", data: token})
    }catch(err){
        res.status(500).json({
            msg: "server down",
             details: err.message
            });
    }
}



// login endpoint

const login = async (req, res) =>{
    try{
        const {password, email} = req.body;
        // get all details about the chosen user that was stored in the database using its email
        const allUserDetails = await User.findOne({email});
        if(!allUserDetails) return res.status(400).json({msg: "user not founded"})
            // password check
            const isMatch = await bcrypt.compare(password, allUserDetails.password);
        if(!isMatch) return res.status(400).json({msg: "wrong password"});
        // give user a token
         const token = jwt.sign(
            { id: allUserDetails._id, role: allUserDetails.role },  
            secret,              
            { expiresIn: "7d" }  )    
                //save token in safe place instead of localstorage
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 7*24*60*60*1000
                // secure: process.env.NODE_ENV === 'production', // true in production, false in local
                // sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
            });
            // const userWithoutPassword = await User.findById(allUserDetails._id).select("-password");
            res.status(200).json({ msg: "logged in successfully" });
    }catch(err){
        
        res.status(500).json({
            msg: "server down",
             details: err.message
            });
    }
}




// me endpoint 
// getting the loged current user details
const me = async(req, res)=>{
    try{
        const token= req.cookies.token;
        // token from line above, secret that what we get from .env
        // const userData = User.findById(decoded.id);
        // check token?
        if(!token) {
            return res.status(401).json({ msg: "no token,u r not authraized" });
        }
        
        const decoded = jwt.verify(token, secret); // decoded store the payload
        const userData = await User.findById(decoded.id).select("-password"); // remove password from the res
        // send user data in the res as json
        res.status(200).json({msg: "user data:", data: userData});

    }catch(err){
        res.status(500).json({
            msg: "server down",
             details: err.message
            });
    }
}


const logout = async (req, res) => {
    try{
        // const token = req.cookies.token; // i dont need it cause its already in the cookie

        // refreash token
        res.clearCookie("token");
        res.status(200).json({msg: "logged out successfully"})

    }catch(err){
          res.status(500).json({
            msg: "server down",
             details: err.message
            });
    }
    
}





module.exports = {register, login, me, logout};





// first we need the model to deal with the database:
const CompanyProfile = require("../models/CompanyProfile");
// curd HTTP Methods REST API

//  createProfile endpoint
const createProfile = async (req, res)=>{
    try{
        const {description, comName, website} = req.body;
        const userId = req.userData.id;
        const existingProfile = await CompanyProfile.findOne({userId}) // search for profile data by userId
        if(existingProfile) return res.status(400).json({msg: "profile already exists"});
        // create user data email
        const data = await CompanyProfile.create({comName, website, description, userId})
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
        const profileData = await CompanyProfile.findOne({userId});
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
            const profileData = await CompanyProfile.findOne({userId});
            if (!profileData) return res.status(404).json({msg: "user not founded"});
            const profileUpdated  = await CompanyProfile.findOneAndUpdate(
                // arguments(3): 1 filter, 2 the updated data, the option arrg must be true to save the updated data and return it
                 {userId}, {$set:{comName, description, website}}, {new: true} 
                );
            res.status(200).json({msg: "profile updated", data: profileUpdated});
        }catch(err){
         res.status(500).json({ msg: "server down", details: err.message }); 
        }
    }

    // endpoint 
    const deleteProfile = async (req, res)=>{
        try{
            const userId = req.userData.id
            // get profile data for check
            const profileData = await CompanyProfile.findOne({userId});
            if(!profileData) return res.status(404).json({msg: 'user not founded'});
             await CompanyProfile.findOneAndDelete({userId})// it take on arrg the deleted target id 
             // with out a var cause we dont need anything to be returned we just delete
            res.status(200).json({msg: " profile deleted"})
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






const HunterProfile = require("../models/HunterProfile");

// hunter curd http method rest api
//createProfile endpoint
const createProfile = async(req, res)=>{
    try{
        const {nickName, skills, bio} = req.body;
        const userId = req.userData.id;
        // search profile to check on it
        const profileData = await HunterProfile.findOne({userId});
        if(profileData) return res.status(400).json({msg: "user already existed"});
        const profile = await HunterProfile.create({nickName, skills, userId, bio});
        res.status(201).json({msg: "user created", data: profile});
    }catch(err){
        res.status(500).json({msg: "server error", details: err.message});
    }
}

//getProfile endpoint
const getProfile = async (req, res)=>{
    try{
        const userId = req.userData.id;
        const profileData = await HunterProfile.findOne({userId});
        if(!profileData) return res.status(404).json({msg: "profile not founded"});
        res.status(200).json({msg: "profile founded", data: profileData});
    }catch(err){
        res.status(500).json({msg: "server error", details: err.message});
    }
}

//updateProfile endpoint
const updateProfile = async (req, res)=>{
    try{
        const {nickName, skills, bio} = req.body;
        const userId = req.userData.id;
        // search profile to check on it
        const profileData = await HunterProfile.findOne({userId});
        if(!profileData) return res.status(404).json({msg: "profile not founded"});
        const profileUpdated = await HunterProfile.findOneAndUpdate({userId}, 
            {$set:{nickName, skills, bio}},
            {new: true}
        );
        res.status(200).json({msg: "profile updated", data: profileUpdated});
    }catch(err){
        res.status(500).json({msg: "server error", details: err.message});
    }
}

//deleteProfile endpoint
const deleteProfile = async (req, res)=>{
    try{
        const userId = req.userData.id;
        const profileData = await HunterProfile.findOne({userId});
        if(!profileData) return res.status(404).json({msg: "profile not founded"});
        await HunterProfile.findOneAndDelete({userId});
        res.status(200).json({msg: "profile deleted"});

    }catch(err){
        res.status(500).json({msg: "server error", details: err.message});
    }
}



// export the endpoints
module.exports= {
    createProfile,
    getProfile,
    updateProfile,
    deleteProfile

}




const Program = require("../models/Program");
const CompanyProfile = require("../models/CompanyProfile");
// errorhandler
const errHandler = (res, err)=>{
     res.status(500).json({ msg: "server down", details: err.message });
}

//Progrm endpoints code and curd logic

//createProgram endpoint
const createProgram = async(req, res)=>{
    try{
        const {title, description,scope,rewards} = req.body;
        const userId = req.userData.id;
        const company = await CompanyProfile.findOne({userId});
        if(!company) return res.status(404).json({msg: "company not found"});
        const companyId = company.id;
        const program = await Program.create({
            title, description,scope, rewards, companyId
        });
        res.status(201).json({msg: "program created", data: program});
        

    }catch(err){
        errHandler(res, err);
    }
}




//getPrograms endpoint
const getPrograms = async(req, res)=>{
    try{
        const userId = req.userData.id;
        const company = await CompanyProfile.findOne({userId});
        if(!company) return res.status(404).json({msg: "user not found"});
        const companyId = company.id
        const programs = await Program.find({companyId})
        res.status(200).json({msg: "all programs ", data: programs});
    }catch(err){
        errHandler(res, err);
    }
}


// getProgram
const getProgram = async(req, res)=>{
    try{
        const id = req.params.id;
        const program = await Program.findById(id);
        if(!program) return res.status(404).json({msg: "not found"});
        res.status(200).json({msg: "program found", data: program});
    }catch(err){ errHandler(res, err); }
}

// updateProgram
const updateProgram = async(req, res)=>{
    try{
        const {title, description, scope, rewards,isActive} = req.body;
        const id = req.params.id;
        const program = await Program.findById(id);
        if(!program) return res.status(404).json({msg: "not found"});
        const updated = await Program.findByIdAndUpdate(id, {$set:{title, description, scope, rewards,isActive}}, {new: true});
        res.status(200).json({msg: "program updated", data: updated});
    }catch(err){ errHandler(res, err); }
}

// deleteProgram
const deleteProgram = async(req, res)=>{
    try{
        const id = req.params.id;
        const program = await Program.findById(id);
        if(!program) return res.status(404).json({msg: "not founded"});
        await Program.findByIdAndDelete(id);
        res.status(200).json({msg: "program deleted"});
    }catch(err){ errHandler(res, err); }
}

module.exports = {
    deleteProgram,
    updateProgram,
    getProgram,
    getPrograms,
    createProgram,
}









// // updateProgram
// const updateProgram = async (req, res) => {
//     try {
//         const id = req.params.id;
        
//         // 1. نتأكد إن البرنامج موجود الأول
//         const program = await Program.findById(id);
//         if (!program) return res.status(404).json({msg: "not found"});

//         // 2. نحدث الداتا كلها باللي جاي من req.body (لأن Joi مفلترها خلاص)
//         const updated = await Program.findByIdAndUpdate(
//             id, 
//             { $set: req.body }, 
//             { new: true }
//         );

//         res.status(200).json({msg: "program updated", data: updated});
//     } catch (err) { 
//         errHandler(res, err); 
//     }
// }





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
        const programData = await Program.findById(programId);
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
        //Frontend flow:
        // fornt end side  user is stand on the programs page that provided by the url: "https://localhost:5000/reports"
        // he clicke on ux/ui report bouton for a spacivic program
        // that program holds an id :id for itself, 
        // so on the click eventlistener send the url contained the :id for the choosen program,
        //  and the url gose to :  "https://localhost:5000/reports/report/${program._id}"
        //now we are selecting this id by the params method and sending it to the back side,
        //  so we could get all reports for this spacivic program
        const programId = req.params.id;
        // go to the Reports collection
        // search in all documents
        //  find every document that has programId field = "PROG123" 
        //  return all of them in an Array
        //like mysql: SELECT * FROM reports WHERE programId = "PROG123"
        //          يعني انت تقصد ان من غير الأقواس بقوله روح دور على فيلد اسمه PROG123
        // مش دور على فيلد اسمه programId بيحمل قيمةPROG123
        // فلما يروح الكوليكشن مش هيلاقي اي فيلد في اي دكيومنت اسمه PROG123
        // فهيرجعلنا نل
        const allReportes = await Report.find({programId});
        //check if allReports arry has no reports return no reportes founded
        if(allReportes.length===0 ) return res.status(404).json({msg: "no reportes founded"});
        // === for more savety compare data type and value
        //no thing to be done we just return all data founded 
        res.status(200).json({msg: "reportes founded", data: allReportes});
    }catch(err){
        errHandler(res, err);
    };
};


// getReport endpoint

const getReport = async (req, res) =>{
    try{
        // now user stands on allreports page, he is selcting one report
        // so path is: "https://localhost:5000/reports/report" all reports
        // on click on one report url gose to:"https://localhost:5000/reports/report/${report._id}"
        const reportId = req.params.id;
        // now we get the report id, after that we need to get the data of this selected id report
        const reportData = await Report.findOne({_id: reportId});
        //   go to the Reports collection
        //  find the document that has a field called _id = "REPORT123"
        //  return all the data inside that document
        // store it in a variable called reportData
        // in mysql: SELECT * FROM reports WHERE _id = "REPORT123"
        // so we can send it back to the Frontend in the response
        if(!reportData) return res.status(404).json({msg: "not found"});
        res.status(200).json({msg: "report founded", data: reportData});

    }catch(err){
        errHandler(res, err);
    };
};

// updateReport endpoint

const companyUpdateReport = async (req, res) =>{
    try{
        // now user stands on allreports page, he is selcting one report
        // so path is: "https://localhost:5000/reports/report" all reports
        // on click on one report url gose to:"https://localhost:5000/reports/report/${report._id}"
        const reportId = req.params.id;
        // get the status from the req body to be updated
        const {status}= req.body;
        //check status
        if(status!== "accepted" && status !== "rejected") return res.status(400).json({msg: "invalid status"});
        const reportData = await Report.findOne({_id: reportId});
        //check data of report
        if(!reportData) return res.status(404).json({msg: "not found"});
        //update report status by the company for the hunter
        const updatedReport= await Report.findByIdAndUpdate(reportId, {$set: {status}}, {new: true});
                // لو الـ status اتغير لـ "accepted" → زود reputation للـ Hunter
        if(status === "accepted") {
            const points = {
                low: 10,
                medium: 25,
                high: 50,
                critical: 100
            };
            await HunterProfile.findOneAndUpdate(
                {userId: reportData.hunterId},
                {$inc: {reputation: points[reportData.severity]|| 0}} // we used inc here cause we need to increament the hunter raputation
                // if we used set it will overwrite the score of the hunter to the static given value (50) 0r (100) etc..
            );
        }
        // return the result
        res.status(200).json({msg: "report updated", data: updatedReport});
    }catch(err){
        errHandler(res, err);
    };
};
const hunterUpdateReport = async (req, res)=>{
    try{
        const reportId = req.params.id;
        const hunterId = req.userData.id
        const {title, description, severity, proofUrl} = req.body;
        //check for data camed right
        if (!title ||!description ||!severity ||!proofUrl) return res.status(400).json({msg: "all fields r required"});
        const reportData = await Report.findById(reportId);
        //check that we get all data form the report including the hunter id
        if(!reportData) return res.status(404).json({msg: "not found"});
        // check about the hunter that he own the report
        if(reportData.hunterId.toString() !== hunterId) return res.status(403).json({msg: "you r not authorized"});
        // update the data
        const updateReport = await Report.findByIdAndUpdate(reportId, {$set: {title, description, severity, proofUrl}}, {new: true});
        //return the result
        res.status(200).json({msg: "report updated hunter side", data: updateReport});
    }catch(err){
        errHandler(res, err);
    };
}

module.exports= {
    createReport,
    getReport,
    getReports,
    companyUpdateReport,
    hunterUpdateReport,
    
};






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


const Joi = require("joi");
// register joi
const registerSchema= Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().max(100).required(),
    password: Joi.string().min(6).max(100).required(),
    role: Joi.string().lowercase().valid("company","admin", "hunter").required(),

});

// login joi
const loginSchema = Joi.object({
    email: Joi.string().email().max(100).required(),
    password: Joi.string().min(6).max(100).required()
});

//company profile
const companyProfileSchema = Joi.object({
    comName: Joi.string().min(3).max(100).required(),
    website: Joi.string().uri().required(),
    description: Joi.string().max(500)
});
//hunter profile
const hunterProfileSchema = Joi.object({
    nickName: Joi.string().min(3).max(30).required(),
    bio: Joi.string().max(500),
    skills: Joi.array().items(Joi.string()).required()
});
// report profile
const reportSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().required(),
    severity: Joi.string().lowercase().valid("low", "medium", "high", "critical").required(),
    proofUrl: Joi.string().uri().required()
});

// statusSchema
const statusSchema = Joi.object({
    status: Joi.string().valid("accepted", "rejected").required()
});

// program
const programSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(1000).required(),
    scope: Joi.array().items(Joi.string()).required(),
    rewards: Joi.object({
        low: Joi.number().required(),
        medium: Joi.number().required(),
        high: Joi.number().required(),
        critical: Joi.number().required()
    }).required(),
    isActive: Joi.boolean()
});

// validate 
const validate = (schema) =>{
    // console.log("validate called");
    return (req, res, next)=>{
        // console.log("middleware running");
        const {error} = schema.validate(req.body, {abortEarly: false});

        if(error) {
            const errMsg = error.details.map((errItem)=>errItem.message)
            // return res.status(400).json({msg: error.details[0].message});
        return res.status(400).json({msg: "data entered is not right", errors: errMsg});
        }
        next();
    };
};

module.exports = {validate,loginSchema, registerSchema,companyProfileSchema ,hunterProfileSchema ,reportSchema,statusSchema, programSchema};








const mongoose = require("mongoose");
const CompanyProfileSchema= new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    comName: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    description: String,
    verified: { // check if it first time or not
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const CompanyProfile = mongoose.model("CompanyProfile", CompanyProfileSchema);
module.exports = CompanyProfile;








const mongoose = require("mongoose");


const HunterProfileSchema = new mongoose.Schema({
nickName: {
    type: String,
    required: true,
    unique: true
},
bio: String,
skills: {
    type: Array,
    required: true,
},
reputation: {
    type: Number,
    default: 0
},
userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
},
verified: {
    type: Boolean,
    default: false,
}

}, {timestamps: true})


const HunterProfile = mongoose.model("HunterProfile", HunterProfileSchema);
module.exports = HunterProfile;




const mongoose = require("mongoose");
const programSchema = new mongoose.Schema({
    companyId:{

    type: mongoose.Schema.Types.ObjectId,
    ref: "CompanyProfile",
    required: true

    } ,
    title: {
        type: String,
        required: true
    } ,    
    description: {
        type: String
    },
    scope:     { 
        type: [String], // ← Array of Strings of things that hunter can reach
        default: []
}  ,
    rewards:   {
        low: { type: Number, default: 0 },
    medium: { type: Number, default: 0 },
    high: { type: Number, default: 0 },
    critical: { type: Number, default: 0 }
    } , 
    isActive:  {
        type: Boolean,
        default: false
    }  
}, {timestamps: true});

const Program = mongoose.model("Program", programSchema);
module.exports = Program;



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












const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        // unique: true  // never do this again cause every profile you will do will be saved as a hunter not company or admin
    },
    role: {
        type: String,
        enum: ["admin", "company", "hunter"],
        required:true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const User = mongoose.model("User", UserSchema);
module.exports = User;





const express = require("express");
const router = express.Router();
const {verifyToken, verifyRole} = require("../middleware/auth.middleware");
const {
    getAllCompanies,
    verifyCompany,
    getAllHunters,
    verifyHunter,
    getAllPrograms,
    toggleProgram,
    getAllReports,
    deleteReport
} = require("../controllers/adminController");

// companies
router.get("/companies", verifyToken, verifyRole("admin"), getAllCompanies);
router.put("/companies/:id", verifyToken, verifyRole("admin"), verifyCompany);

// hunters
router.get("/hunters", verifyToken, verifyRole("admin"), getAllHunters);
router.put("/hunters/:id", verifyToken, verifyRole("admin"), verifyHunter);

// programs
router.get("/programs", verifyToken, verifyRole("admin"), getAllPrograms);
router.put("/programs/:id", verifyToken, verifyRole("admin"), toggleProgram);

// reports
router.get("/reports", verifyToken, verifyRole("admin"), getAllReports);
router.delete("/reports/:id", verifyToken, verifyRole("admin"), deleteReport);

module.exports = router;



// ✅ W3-BE-01 → getAllCompanies + verifyCompany
// ✅ W3-BE-02 → getAllHunters + verifyHunter
// ✅ W3-BE-03 → getAllPrograms + toggleProgram
// ✅ W3-BE-04 → getAllReports + deleteReport
// ✅ W3-BE-05 → Reputation System





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












// build Router steps
const express = require("express");
const router = express.Router();
const {verifyToken} = require("../middleware/auth.middleware");
const {createProfile, getProfile, updateProfile, deleteProfile} = require("../controllers/companyProfileController");
const {validate,companyProfileSchema } = require("../middleware/validation")
router.post("/profile",verifyToken,validate(companyProfileSchema), createProfile);
router.get("/profile",verifyToken, getProfile);
router.put("/profile",verifyToken,validate(companyProfileSchema), updateProfile);
router.delete("/profile",verifyToken, deleteProfile);
module.exports =  router;




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




const express = require("express");
const router = express.Router();
const {verifyToken} = require("../middleware/auth.middleware");
    const {validate, programSchema} = require("../middleware/validation");
const {  deleteProgram,
    updateProgram,
    getProgram,
    getPrograms,
    createProgram}= require("../controllers/programController")
    // router.post("/program",verifyToken, createProgram);
    router.post("/program", verifyToken, validate(programSchema), createProgram);
    router.get("/programs",verifyToken, getPrograms);
    router.get("/programs/:id",verifyToken, getProgram);
    // router.put("/program/:id",verifyToken, updateProgram);
    router.put("/program/:id", verifyToken, validate(programSchema), updateProgram);
    router.delete("/program/:id",verifyToken, deleteProgram);

    module.exports = router;




    
const express = require("express");
const router = express.Router();
const {verifyToken} = require("../middleware/auth.middleware");
const {validate,reportSchema,statusSchema } = require("../middleware/validation")
const { createReport, getReports, getReport, 
        companyUpdateReport, hunterUpdateReport } = require("../controllers/reportController");
router.post("/report/:id",verifyToken,validate(reportSchema), createReport); //Hunter
router.get("/report/:id",verifyToken, getReports); // Company
router.get("/report/single/:id",verifyToken, getReport); // Company
router.put("/report/company/:id",verifyToken,validate(statusSchema), companyUpdateReport); // Company
router.put("/report/hunter/:id",verifyToken,validate(reportSchema), hunterUpdateReport); //Hunter

module.exports = router;


PORT=5000
MONGO_URI=mongodb://localhost:27017/bugbounty
JWT_SECRET=your_secret_key_here
#NODE_ENV=development # to solve postman data show in it develop vs deploy








require("dotenv").config();

//  W1-BE-01 → Project Setup
//  W1-BE-02 → User Model
//  W1-BE-03 → Register
//  W1-BE-04 → Login
//  W1-BE-05 → Me + Logout

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookie_parser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cors({
origin: 'http://localhost:5173',
credentials:true,
}
));
app.use(cookie_parser());
const dbconnection = require("./config/db");
dbconnection();
const PORT = process.env.PORT;

//Routes

// aut linking
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);
// company router linking
const companyRoutes = require("./routes/companyProfileRoutes")
app.use("/company", companyRoutes)
// hunter router linking
const hunterRoutes = require("./routes/hunterRoutes");
app.use("/hunter", hunterRoutes);
//program router linking
const programRoutes = require("./routes/programRoutes");
app.use("/programs", programRoutes)
// report router linking
const reportRoutes = require("./routes/reportRoutes");
app.use("/reports", reportRoutes);
//admin router linking
const adminRoutes = require("./routes/adminRoutes");
app.use("/admin", adminRoutes);






// run port app
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});




{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "dependencies": {
    "bcryptjs": "^3.0.3",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.6",
    "dotenv": "^17.3.1",
    "express": "^5.2.1",
    "joi": "^18.1.1",
    "jsonwebtoken": "^9.0.3",
    "mongoose": "^9.2.4"
  },
  "devDependencies": {
    "nodemon": "^3.1.14"
  }
}
















// front end side start from here


import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';

function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/auth/logout', {}, {
        withCredentials: true
      });
      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <span className="navbar-brand fw-bold">🛡️ Bug Bounty</span>
      <div className="d-flex align-items-center gap-3">
        <span className="text-white">
          {user?.name}
          <span className="badge bg-secondary ms-2">{user?.role}</span>
        </span>
        <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;



import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
// start the peacekeeper
function ProtectedRoute({ children, allowedRole }) {
  //  Fetch data from the Single Source of Truth
  const { user, loading } = useContext(AuthContext);

  //  Wait for the Axios response from the backend to prevent premature redirects
  if (loading) {
    return <div>Loading... (Verifying Identity)</div>; 
  }

  //  Guard Clause: If not logged in, redirect to the Login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  //  Role Authorization: Prevent a user from accessing another role's dashboard 
  // (e.g., preventing a Hunter from accessing a B2B Company route)
  if (allowedRole && user.role !== allowedRole) {
    // Redirect them to their designated dashboard based on their actual role
    return <Navigate to={`/${user.role}`} replace />;
  }

  // Access Granted: Render the loosely coupled children components
  return children;
}

export default ProtectedRoute;





import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// 1. Create the Context
export const AuthContext = createContext();

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => { // chilren = app now 
  const [user, setUser] = useState(null); // Stores user data (null if not logged in)
  const [loading, setLoading] = useState(true); // Tracks initial authentication check
const checkAuth = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auth/me', {
        withCredentials: true, 
      });
      setUser(response.data.data); 
    } catch (err) {
      setUser(null); 
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
   
    checkAuth();
  }, []); // Empty array ensures this runs ONLY once on initial app load

  // 3. Broadcast the state to all wrapped components
  return (
    <AuthContext.Provider value={{ user, setUser, loading, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};




function Admin() {
  return <h1>Admin Page</h1>
}

export default Admin


import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function CompanyDashboard() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        // نستخدم الـ Endpoint اللي بيجيب برامج الشركة دي بس
        const res = await axios.get('http://localhost:5000/programs/programs', {
          withCredentials: true
        });
        setPrograms(res.data.data);
      } catch (err) {
        // لو مفيش بروفايل أصلاً، الباك إند هيرجع 404 "user not found" (حسب الكود بتاعك)
        if (err.response?.status === 404 && err.response?.data?.msg === "user not found") {
          navigate('/complete-profile'); // وديه يعمل بروفايل فوراً
        } else {
          setError(err.response?.data?.msg || "Failed to load programs");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Company Dashboard</h2>
          <Link to="/create-program" className="btn btn-primary fw-bold">+ Create New Program</Link>
        </div>

        {error && <div className="alert alert-warning text-center">{error}</div>}

        <div className="row">
          {loading ? (
            <div className="text-center w-100 mt-5"><h5>Loading your programs...</h5></div>
          ) : programs.length === 0 ? (
            <div className="text-center mt-5 p-5 border rounded bg-light">
              <h4>No programs found!</h4>
              <p>Start your first Bug Bounty program to receive security reports.</p>
            </div>
          ) : (
            programs.map((prog) => (
              <div className="col-md-4 mb-4" key={prog._id}>
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title fw-bold text-primary">{prog.title}</h5>
                      <span className={`badge ${prog.isActive ? 'bg-success' : 'bg-secondary'}`}>
                        {prog.isActive ? 'Active' : 'Paused'}
                      </span>
                    </div>
                    <p className="card-text text-muted text-truncate">{prog.description}</p>
                    <div className="mt-auto border-top pt-3">
                      <div className="d-flex justify-content-between small mb-3">
                        <span>💰 Critical: <strong>${prog.rewards.critical}</strong></span>
                        <span>🎯 Scope: <strong>{prog.scope.length}</strong> items</span>
                      </div>
                      <div className="d-group d-flex gap-2">
                         <Link to={`/edit-program/${prog._id}`} className="btn btn-sm btn-outline-dark flex-grow-1">Edit</Link>
                         <Link to={`/programs/${prog._id}/reports`} className="btn btn-sm btn-info flex-grow-1 text-white">View Reports</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default CompanyDashboard;


import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function CompanyReports() {
  const { id } = useParams(); // Program ID
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all reports related to this program
    const fetchReports = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/reports/report/${id}`, {
          withCredentials: true
        });
        setReports(res.data.data);
      } catch (err) {
        setError(err.response?.data?.msg || "No reports found for this program");
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [id]);

  const updateStatus = async (reportId, newStatus) => {
    try {
      // Endpoint for company to accept/reject report
      await axios.put(`http://localhost:5000/reports/report/company/${reportId}`, 
        { status: newStatus }, 
        { withCredentials: true }
      );
      // Refresh local state to show updated status
      setReports(reports.map(r => r._id === reportId ? { ...r, status: newStatus } : r));
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Program Reports</h2>
          <Link to="/company" className="btn btn-outline-secondary">Dashboard</Link>
        </div>

        {error ? (
          <div className="alert alert-info text-center">{error}</div>
        ) : (
          <div className="table-responsive bg-white shadow-sm p-3 rounded">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Title</th>
                  <th>Severity</th>
                  <th>Status</th>
                  <th>Submitted At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report._id}>
                    <td>
                      <Link to={`/report-details/${report._id}`} className="text-decoration-none fw-bold">
                        {report.title}
                      </Link>
                    </td>
                    <td>
                      <span className={`badge bg-${report.severity === 'critical' ? 'danger' : 'warning text-dark'}`}>
                        {report.severity}
                      </span>
                    </td>
                    <td>
                      <span className={`badge rounded-pill ${report.status === 'accepted' ? 'bg-success' : report.status === 'rejected' ? 'bg-danger' : 'bg-info'}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="small">{new Date(report.createdAt).toLocaleDateString()}</td>
                    <td>
                      {report.status === 'pending' && (
                        <div className="btn-group">
                          <button onClick={() => updateStatus(report._id, 'accepted')} className="btn btn-sm btn-success">Accept</button>
                          <button onClick={() => updateStatus(report._id, 'rejected')} className="btn btn-sm btn-danger">Reject</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default CompanyReports;


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function CompleteCompanyProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    comName: '',      // اسم الشركة
    website: '',      // الموقع
    description: ''   // الوصف
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // الرابط الصحيح بناءً على server.js بتاعك
      await axios.post('http://localhost:5000/company/profile', formData, {
        withCredentials: true
      });
      
      // بعد ما ننشئ البروفايل بنجاح، نرجعه للداشبورد عشان يقدر يعمل برامج
      navigate('/company');
    } catch (err) {
      // لو في أخطاء من Joi middleware هتظهر هنا
      const serverErrors = err.response?.data?.errors;
      setError(serverErrors ? serverErrors.join(" | ") : (err.response?.data?.msg || "حدث خطأ ما"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5" style={{ maxWidth: '600px' }}>
        <div className="card shadow-sm border-0">
          <div className="card-body p-4">
            <h2 className="fw-bold mb-4 text-center">إكمال بروفايل الشركة</h2>
            
            {error && <div className="alert alert-danger text-center">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Company Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="comName" 
                  value={formData.comName} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Website (URL)</label>
                <input 
                  type="url" 
                  className="form-control" 
                  name="website" 
                  placeholder="https://example.com"
                  value={formData.website} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">Description</label>
                <textarea 
                  className="form-control" 
                  name="description" 
                  rows="4" 
                  value={formData.description} 
                  onChange={handleChange}
                  placeholder="تكلم عن شركتك واهتماماتك الأمنية..."
                ></textarea>
              </div>

              <button type="submit" className="btn btn-success w-100 fw-bold py-2" disabled={loading}>
                {loading ? 'جاري الحفظ...' : 'حفظ البيانات والاستمرار'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompleteCompanyProfile;




import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function CreateProgram() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initializing state to match your Joi programSchema
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    scope: '', // We will handle this as a string then split it into an array
    rewards: {
      low: 0,
      medium: 0,
      high: 0,
      critical: 0
    },
    isActive: true // Optional field in your schema
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRewardChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      rewards: {
        ...prev.rewards,
        [name]: Number(value)
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Logic to convert comma-separated string into an array for Joi
      const finalData = {
        ...formData,
        scope: formData.scope.split(',').map(item => item.trim()).filter(item => item !== "")
      };

      // Ensure the endpoint matches your backend exactly: /programs/program
      await axios.post('http://localhost:5000/programs/program', finalData, {
        withCredentials: true
      });
      
      navigate('/company');
    } catch (err) {
      // If Joi returns multiple errors, they will be inside err.response.data.errors
      const serverError = err.response?.data?.errors ? err.response.data.errors.join(", ") : err.response?.data?.msg;
      setError(serverError || "Failed to create program");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 mb-5" style={{ maxWidth: '800px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Create New Program</h2>
          <Link to="/company" className="btn btn-secondary shadow-sm">&larr; Cancel</Link>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card shadow-sm border-0">
          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className="mb-4">
                <label className="form-label fw-bold">Program Title</label>
                <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
              </div>

              {/* Scope - Added this to match your schema */}
              <div className="mb-4">
                <label className="form-label fw-bold">Scope (Domains/URLs)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="scope" 
                  placeholder="example.com, api.example.com (Separate with commas)" 
                  value={formData.scope} 
                  onChange={handleChange} 
                  required 
                />
                <small className="text-muted">Enter domains separated by commas.</small>
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="form-label fw-bold">Description (Min 10 characters)</label>
                <textarea className="form-control" name="description" rows="4" value={formData.description} onChange={handleChange} required></textarea>
              </div>

              <hr />
              <h5 className="fw-bold mb-3">Rewards (USD)</h5>
              <div className="row g-3 mb-4">
                {['low', 'medium', 'high', 'critical'].map((level) => (
                  <div className="col-md-3" key={level}>
                    <label className="form-label text-capitalize">{level}</label>
                    <input type="number" className="form-control" name={level} value={formData.rewards[level]} onChange={handleRewardChange} required />
                  </div>
                ))}
              </div>

              <button type="submit" className="btn btn-primary w-100 fw-bold" disabled={loading}>
                {loading ? 'Processing...' : 'Publish Program'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateProgram;



import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function EditProgram() {
  const { id } = useParams(); // Get program ID from URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    scope: '', // String to be converted to Array
    rewards: { low: 0, medium: 0, high: 0, critical: 0 },
    isActive: true
  });

  useEffect(() => {
    // Fetch current program data to fill the form
    const fetchProgram = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/programs/programs/${id}`, {
          withCredentials: true
        });
        const data = res.data.data;
        setFormData({
          ...data,
          scope: data.scope.join(', ') // Convert Array back to String for the input field
        });
      } catch (err) {
        setError("Failed to fetch program details");
      } finally {
        setLoading(false);
      }
    };
    fetchProgram();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRewardChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      rewards: { ...prev.rewards, [name]: Number(value) }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Process scope string into array before sending
      const finalData = {
        ...formData,
        scope: formData.scope.split(',').map(item => item.trim()).filter(item => item !== "")
      };

      await axios.put(`http://localhost:5000/programs/program/${id}`, finalData, {
        withCredentials: true
      });
      navigate('/company'); // Redirect to dashboard after update
    } catch (err) {
      setError(err.response?.data?.msg || "Update failed");
    }
  };

  if (loading) return <Navbar />;

  return (
    <>
      <Navbar />
      <div className="container mt-5 mb-5" style={{ maxWidth: '700px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Edit Program</h2>
          <Link to="/company" className="btn btn-secondary">Back</Link>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card shadow-sm border-0">
          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Program Title</label>
                <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
              </div>

              <div className="mb-3 form-check form-switch">
                <input className="form-check-input" type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
                <label className="form-check-label fw-bold">Active Status</label>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Scope (Comma separated)</label>
                <input type="text" className="form-control" name="scope" value={formData.scope} onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Description</label>
                <textarea className="form-control" name="description" rows="5" value={formData.description} onChange={handleChange} required></textarea>
              </div>

              <h6 className="fw-bold mb-3 border-bottom pb-2">Bounty Rewards (USD)</h6>
              <div className="row g-2 mb-4">
                {['low', 'medium', 'high', 'critical'].map((level) => (
                  <div className="col-3" key={level}>
                    <label className="form-label small text-capitalize">{level}</label>
                    <input type="number" className="form-control" name={level} value={formData.rewards[level]} onChange={handleRewardChange} required />
                  </div>
                ))}
              </div>

              <button type="submit" className="btn btn-primary w-100 fw-bold py-2">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProgram;


import { useState, useEffect } from 'react';
import axios from 'axios';

function HunterDashboard() {
  //   memory and data State 
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  //   useEffect to get the data from the apis
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        // Method: GET (URL, Config)
        const response = await axios.get('http://localhost:5000/programs', {
          withCredentials: true //to send the  HttpOnly Cookie to the backend peacekeeper 
        });
        
        // 3.   API Wrapper
        setPrograms(response.data.data); 
        setLoading(false);
      } catch (error) {
        console.error("Path Error:", error.response?.status);
        // console.error("Error fetching programs:", error);
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []); // empty array to work once atleast

  // Guard Clause for Loading
  if (loading) return <div>Loading B2B Programs...</div>;

  return (
    <div className="dashboard-container">
      <h2>Available B2B Bug Bounty Programs</h2>
      <div className="programs-grid">
        {programs.map((prog) => (
          <div key={prog._id} className="program-card">
            <h3>{prog.companyName}</h3>
            <p>Target: {prog.targetUrl}</p>
            <p>Max Bounty: ${prog.maxBounty}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HunterDashboard;




// full sides error handleer
// catch (err) {
//   //  دي رسالة الباك إند اللي إحنا تعبنا فيها
//   const serverMsg = err.response?.data?.msg; 
  
//   //  دي الرسالة العامة بتاعة أكسيوس لو السيرفر مبردش أصلاً
//   const genericMsg = err.message;

//   console.error("The Error Is:", serverMsg || genericMsg);
// }



import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // To display error messages neatly
  
  const navigate = useNavigate();
  // Getting setUser from our "broadcasting station" (Context) to update the global app state
  const { setUser } = useContext(AuthContext); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    
    try {
      // 1. Send login credentials to get the token in Cookies
      await axios.post('http://localhost:5000/auth/login', 
        { email, password },
        { withCredentials: true }
      );

      // 2. Fetch current user data to determine their Role
      const res = await axios.get('http://localhost:5000/auth/me', {
        withCredentials: true
      });

      // 3. Update the Context immediately with the new data
      const userData = res.data.data;
      setUser(userData); 

      // 4. Dynamic routing to the appropriate dashboard
      navigate(`/${userData.role}`);

    } catch (err) {
      // Catch the error and display it to the user
      setError(err.response?.data?.msg || "An error occurred during login");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold">Welcome Back 🛡️</h2>
                <p className="text-muted">Login to your Bug Bounty account</p>
              </div>

              {/* Display error message if it exists */}
              {error && <div className="alert alert-danger py-2">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-medium">Email Address</label>
                  <input 
                    type="email" 
                    className="form-control"
                    placeholder="name@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-medium">Password</label>
                  <input 
                    type="password" 
                    className="form-control"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                  />
                </div>

                <button type="submit" className="btn btn-dark w-100 mb-3 py-2 fw-bold">
                  Login
                </button>

                <div className="text-center mt-3">
                  <span className="text-muted small">Don't have an account? </span>
                  <Link to="/register" className="text-decoration-none fw-bold small text-primary">
                    Register here
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;



import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function ProgramReports() {
  const { id } = useParams(); // Program ID from URL
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        // المطابقة مع ملف الراوتر بتاعك: /reports/report/:id
        const response = await axios.get(`http://localhost:5000/reports/report/${id}`, {
          withCredentials: true
        });
        
        // الداتا راجعة جوه response.data.data زي ما انت كاتب في الكنترولر
        setReports(response.data.data);
        setError(null);
      } catch (err) {
        // لو الباك إند رجع 404 (no reportes founded) زي ما انت مبرمجه
        if (err.response && err.response.status === 404) {
          setReports([]); // خلي المصفوفة فاضية عشان الـ UI يعرض رسالة "مفيش تقارير"
        } else {
          // أي خطأ تاني (مثلاً السيرفر واقع 500)
          setError(err.response?.data?.msg || err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold">Program Reports</h2>
            <p className="text-muted">Review vulnerabilities submitted by hunters.</p>
          </div>
          <Link to="/company" className="btn btn-secondary shadow-sm">
            &larr; Back to Dashboard
          </Link>
        </div>

        {/* عرض أي خطأ سيرفر حقيقي لو حصل */}
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            {reports.length === 0 && !error ? (
              <div className="text-center p-5 text-muted">
                No reports have been submitted for this program yet.
              </div>
            ) : (
              <ul className="list-group list-group-flush">
                {reports.map((report) => (
                  <li key={report._id} className="list-group-item p-4 hover-bg-light">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        {/* the report link*/}
                            <Link to={`/report/${report._id}`} className="text-decoration-none">
                            <h5 className="mb-1 fw-bold text-dark hover-text-primary">{report.title}</h5>
                            </Link>                     
                        <small className="text-muted">
                          Hunter ID: <span className="text-primary">{report.hunterId}</span>
                        </small>
                      </div>
                      <div className="text-end">
                        <span className={`badge mb-2 px-3 py-2 ${
                          report.severity === 'critical' ? 'bg-danger' : 
                          report.severity === 'high' ? 'bg-warning text-dark' : 
                          report.severity === 'medium' ? 'bg-primary' : 'bg-success'
                        }`}>
                          {report.severity?.toUpperCase() || 'UNKNOWN'}
                        </span>
                        <br />
                        {/* هنعرض الـ Status اللي انت عملتها في الـ Update Report */}
                        <span className={`badge border ${
                          report.status === 'accepted' ? 'bg-success text-white' : 
                          report.status === 'rejected' ? 'bg-danger text-white' : 
                          'bg-light text-dark'
                        }`}>
                          Status: {report.status || 'Pending'}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProgramReports;



import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

function Register() {
  // 1. Memory: Object State for Scalability
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'hunter' // default value 
  });
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { checkAuth } = useContext(AuthContext); // محطة الإذاعة

  // 2. Logic: Dynamic Field Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 3. Logic: Form Submission & API Call
  const handleSubmit = async (e) => {
    e.preventDefault(); //    preventDefault behavior
    setError(''); //   reset old errors
    
    try {
      //  send data to backend side
      await axios.post('http://localhost:5000/auth/register', formData, {
        withCredentials: true 
      });
      
      // updat user status in all over the app
      await checkAuth(); 
      
      // navigate by the choosen path
      navigate(`/${formData.role}`); 
      
    } catch (err) {
      // Hybrid Error Handler
      const serverMsg = err.response?.data?.msg;
      const genericMsg = err.message;
      setError(serverMsg || genericMsg);
      console.error("Register Error:", err.response?.status);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h2 className="text-center mb-4">Create an Account</h2>
            
            {/* display errors if existed*/}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" name="name" className="form-control" onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" name="email" className="form-control" onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" name="password" className="form-control" onChange={handleChange} required />
              </div>

              <div className="mb-4">
                <label className="form-label">Role</label>
                <select name="role" className="form-select" onChange={handleChange} value={formData.role}>
                  <option value="hunter">Bug Hunter</option>
                  <option value="company">B2B Company</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;


import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function ReportDetails() {
  const { id } = useParams(); // Extracting the report ID from the URL
  const navigate = useNavigate(); // Used to go back to the previous page

  // State management
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false); // For Accept/Reject buttons

  // Fetch report details on component mount
  useEffect(() => {
    const fetchReport = async () => {
      try {
        // Calling your specific backend endpoint for a single report
        const response = await axios.get(`http://localhost:5000/reports/report/single/${id}`, {
          withCredentials: true
        });
        
        setReport(response.data.data);
      } catch (err) {
        setError(err.response?.data?.msg || "Failed to fetch report details");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  // Handle Accept or Reject actions
  const handleUpdateStatus = async (newStatus) => {
    setActionLoading(true);
    try {
      // Calling your update endpoint: router.put("/report/company/:id")
      await axios.put(`http://localhost:5000/reports/report/company/${id}`, 
        { status: newStatus }, 
        { withCredentials: true }
      );
      
      // Update local state to reflect the change immediately without refreshing
      setReport(prevReport => ({ ...prevReport, status: newStatus }));
    } catch (err) {
      alert(err.response?.data?.msg || "Error updating report status");
    } finally {
      setActionLoading(false);
    }
  };

  // Loading UI
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  // Error UI
  if (error || !report) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-danger">{error || "Report not found"}</div>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          &larr; Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5 mb-5">
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Report Details</h2>
          <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
            &larr; Back to Reports
          </button>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-body p-5">
            {/* Badges Row (Severity & Status) */}
            <div className="d-flex justify-content-between mb-4">
              <span className={`badge px-3 py-2 fs-6 ${
                report.severity === 'critical' ? 'bg-danger' : 
                report.severity === 'high' ? 'bg-warning text-dark' : 
                report.severity === 'medium' ? 'bg-primary' : 'bg-success'
              }`}>
                Severity: {report.severity?.toUpperCase()}
              </span>

              <span className={`badge px-3 py-2 fs-6 border ${
                report.status === 'accepted' ? 'bg-success text-white' : 
                report.status === 'rejected' ? 'bg-danger text-white' : 
                'bg-light text-dark'
              }`}>
                Status: {report.status?.toUpperCase() || 'PENDING'}
              </span>
            </div>

            {/* Title and Hunter Info */}
            <h3 className="fw-bold text-dark mb-2">{report.title}</h3>
            <p className="text-muted small mb-4">
              Submitted by Hunter ID: <span className="text-primary">{report.hunterId}</span>
            </p>

            <hr />

            {/* Vulnerability Description */}
            <div className="mb-4 mt-4">
              <h5 className="fw-bold text-dark">Vulnerability Description</h5>
              {/* Using pre-wrap to keep the line breaks written by the hunter */}
              <div className="p-4 bg-light rounded text-dark" style={{ whiteSpace: "pre-wrap" }}>
                {report.description}
              </div>
            </div>

            {/* Proof of Concept (PoC) */}
            <div className="mb-5">
              <h5 className="fw-bold text-dark">Proof of Concept (PoC)</h5>
              <a href={report.proofUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary mt-2">
                View Proof (External Link) &rarr;
              </a>
            </div>

            <hr />

            {/* Action Buttons: Accept / Reject */}
            <div className="d-flex gap-3 mt-4">
              <button 
                className="btn btn-success px-4 py-2 fw-bold shadow-sm"
                onClick={() => handleUpdateStatus('accepted')}
                disabled={actionLoading || report.status === 'accepted'}
              >
                {actionLoading ? 'Processing...' : '✓ Accept Report'}
              </button>

              <button 
                className="btn btn-danger px-4 py-2 fw-bold shadow-sm"
                onClick={() => handleUpdateStatus('rejected')}
                disabled={actionLoading || report.status === 'rejected'}
              >
                {actionLoading ? 'Processing...' : '✕ Reject Report'}
              </button>
            </div>

            {/* Success Note based on your backend logic */}
            {report.status === 'accepted' && (
              <p className="text-success small mt-3 fw-medium">
                * This report has been accepted. Reputation points have been awarded to the hunter.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ReportDetails;


import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import HunterDashboard from './pages/HunterDashboard'
import CompanyDashboard from './pages/CompanyDashboard'
import AdminDashboard from './pages/AdminDashboard'
//call the peacekeeper
import ProtectedRoute from './components/ProtectedRoute'
import ProgramReports from '../src/Pages/ProgramReports'
import ReportDetails from './Pages/ReportDetails';
import CreateProgram from './Pages/CreateProgram';


// Imports
import CompleteCompanyProfile from './pages/CompleteCompanyProfile';
import CompanyDashboard from './pages/CompanyDashboard';
import EditProgram from './pages/EditProgram';
import CompanyReports from './pages/CompanyReports';


function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/login" 
      element={<Login />} />

      <Route path="/register" 
      element={<Register />} />

      {/* protected routes */}
      <Route path="/hunter" 
      element={<ProtectedRoute allowedRole={"hunter"}>
        <HunterDashboard />
        </ProtectedRoute>} />

      <Route path="/company" 
      element={<ProtectedRoute allowedRole={"company"}>
        <CompanyDashboard />
        </ProtectedRoute>} />

      <Route path="/admin" 
      element={<ProtectedRoute allowedRole={"admin"}>
        <AdminDashboard />
        </ProtectedRoute>} />

      <Route path="/programs/:id/reports" 
      element={<ProtectedRoute allowedRole={"company"}>
         <ProgramReports />
        </ProtectedRoute>} />

      <Route path="/report/:id" 
        element={<ProtectedRoute allowedRole={"company"}>
            <ReportDetails />
          </ProtectedRoute>} />

      <Route path="/create-program" 
      element={
        <ProtectedRoute allowedRole={"company"}>
          <CreateProgram />
        </ProtectedRoute>}/>

<Route path="/complete-profile"
 element={<ProtectedRoute allowedRole="company">
  <CompleteCompanyProfile />
  </ProtectedRoute>} />

<Route path="/company"
 element={<ProtectedRoute allowedRole="company">
  <CompanyDashboard />
  </ProtectedRoute>} />

<Route path="/edit-program/:id"
 element={<ProtectedRoute allowedRole="company">
  <EditProgram />
  </ProtectedRoute>} />
  
<Route path="/programs/:id/reports"
 element={<ProtectedRoute allowedRole="company">
  <CompanyReports />
  </ProtectedRoute>} />

    </Routes>
  )
}

export default App

// **الشرح:**
// ```
// Routes   → حاوي كل الصفحات
// Route    → صفحة واحدة
// path     → العنوان في الـ URL
// element  → الـ Component اللي هيتعرض




import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider> 
         {/* wraper */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)


import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])


<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>client</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>



{
  "name": "client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.13.6",
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "react-router-dom": "^7.13.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.4",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "eslint": "^9.39.4",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "globals": "^17.4.0",
    "vite": "^8.0.1"
  }
}


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})



