
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








