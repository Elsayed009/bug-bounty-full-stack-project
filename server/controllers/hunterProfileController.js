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



