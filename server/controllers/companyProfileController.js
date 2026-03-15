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
            const profileUpdated  = await CompanyPorfile.findOneAndUpdate(
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
            const profileData = await CompanyPorfile.findOne({userId});
            if(!profileData) return res.status(404).json({msg: 'user not founded'});
             await CompanyPorfile.findOneAndDelete({userId})// it take on arrg the deleted target id 
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




