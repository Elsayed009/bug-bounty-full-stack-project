
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
        // const allCompanies = await CompanyProfile.find() //get all without condition
        // const allCompanies = await CompanyProfile.find({verified: false}) // not verified only
            // beter we make a query
           // get query parameter from URL
        // const filter = {}; // get all
        // //check on the query that user sent a query condition
        // if (req.query.verified !== undefined) { 
        //     // convert string "true"/"false" to boolean true/false 
        //     // cause in the model we put it as a boolean
        //     filter.verified = req.query.verified === "true";
        // }
        // // go to CompanyProfiles collection and find based on filter
        // const companies = await CompanyProfile.find(filter);
        // // check on the returned array length form the database 
        // if(companies.length === 0) return res.status(404).json({msg: "no companies found"});
        // res.status(200).json({msg: "companies found", data: companies});
        // another code
        //  const { verified } = req.query;
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












// toggle concept

// ليه Admin يوقف برنامج؟
// ← الشركة بعتت برنامج فيه مشكلة
// ← أو الشركة اتحذفت
// ← أو في spam reports على البرنامج ده
// ← Admin بيوقفه عشان Hunters متبعتوش reports عليه
// ليه Admin يشغل برنامج؟
// ← برنامج كان موقوف وتم حل المشكلة
// ← Admin بيشغله تاني عشان Hunters يبعتوا reports

// الفرونت فلو:
// Admin فتح صفحة البرامج
// ← شاف قائمة بكل البرامج
// ← كل برنامج عنده زرار:
//    🟢 "شغال"  → لو isActive = true
//    🔴 "واقف"  → لو isActive = false

// ← دوس على الزرار
// ← Frontend بعت:
//    PUT /admin/program/toggle/PROG123
// ← الزرار اتغير أوتوماتيك

// يعني زي Twitter:
// زرار Follow   → following = true
// زرار Unfollow → following = false
// نفس الزرار بس النتيجة بتتغير 



//for linking all the parts togather so we understand the code well,
//  and why we build it like that we will show the front end code side so we could have a full image

// front end side for the toggle concept

// javascript// لما Admin يدوس على الزرار
// button.addEventListener("click", () => {
//     fetch(`/admin/program/toggle/${program._id}`, {
//         method: "PUT"
//     })
//     .then(res => res.json())
//     .then(data => {
//         // غير شكل الزرار على حسب النتيجة
//         if(data.data.isActive) {
//             button.textContent = "🟢 شغال"
//         } else {
//             button.textContent = "🔴 واقف"
//         }
//     })
// })
// أو في React:
// javascriptconst toggleProgram = async (programId) => {
//     const res = await fetch(`/admin/program/toggle/${programId}`, {
//         method: "PUT"
//     });
//     const data = await res.json();
//     // حدّث الـ state
//     setProgram(data.data);
// }

// // في الـ JSX
// <button onClick={() => toggleProgram(program._id)}>
//     {program.isActive ? "🟢 شغال" : "🔴 واقف"}
// </button>