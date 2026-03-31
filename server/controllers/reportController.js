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



