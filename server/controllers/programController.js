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
        if(!company) return res.status(404).json({msg: "user not found"});
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
        const {title, description, scope, rewards} = req.body;
        const id = req.params.id;
        const program = await Program.findById(id);
        if(!program) return res.status(404).json({msg: "not found"});
        const updated = await Program.findByIdAndUpdate(id, {$set:{title, description, scope, rewards}}, {new: true});
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






