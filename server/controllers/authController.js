const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET


// register endpoint
const register = async (req, res) =>{
    try{
        // get data from body
        const {name, email,password } = req.body;
        // check if its a new user or not
        const userEmail = await User.findOne({email});
        if(userEmail) return res.status(400).json({msg: "email already exists"});
        // encrypt password
        const cryptSalt = await bcrypt.genSalt(10);  // randome num for more security 
        // const hashedPassword = bcrypt.hash(password, 10);
        const hashedPassword = await bcrypt.hash(password, cryptSalt);
        // const data = await User.create({name(create this field and its name is name):name(the value of the name field taken from req.body or any other way like the hashed password), email: email, password: hashedPassword});
        const data = await User.create({name, email, password: hashedPassword});
        //token
        const token = jwt.sign(
            { id: data._id, role: data.role },  
            secret,              
            { expiresIn: "7d" }  )        
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 7*24*60*60*1000
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
            });
            res.status(200).json({ msg: "logged in successfully" });
    }catch(err){
        
        res.status(500).json({
            msg: "server down",
             details: err.message
            });
    }
}




// me endpoint
const me = async(req, res)=>{
    try{
        const token= req.cookies.token;
        const decoded = jwt.verify(token, secret); // decoded store the payload
         // token from line above, secret that what we get from .env
        // const userData = User.findById(decoded.id);
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






