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



// 1. جيب الـ Token من الـ Cookie
// 2. تحقق من الـ Token بـ jwt.verify
// 3. جيب الـ id من جوا الـ Token
// 4. دور على اليوزر في الـ database بالـ id ده
// 5. ارجع بياناته

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






// ليه اليوزر ايميل بيحتوي على المعلومات دي كلها9:28 PMسؤال ذكي! 😄

// عشان User.findOne({email}) بترجع الـ document كامل من الـ database مش الـ email بس!
// يعني:
// javascript// إنت قلتله: دور على user عنده الـ email ده
// const userEmail = await User.findOne({email});

// // هو رجعلك: الـ user كامل بكل fields بتاعته
// userEmail = {
//     _id: "64f8a2b3...",
//     name: "Ahmed",
//     email: "ahmed@gmail.com",
//     password: "$2b$10$xK9...",
//     role: "hunter"
// }
// ```

// ---

// الـ `{email}` ده مش اللي بيرجع — ده شرط البحث:
// ```
// {email} ← "دور على user عنده الـ email ده"
//          ← مش "جيبلي الـ email بس"
// ```

// زي ما تقول لحد:
// ```
// "دور على الشخص اللي اسمه Ahmed"
// ← هيجيبلك الشخص كامل مش اسمه بس 😄






// res.cookie("token", token, {
//                 httpOnly: true,
//                 maxAge: 7*24*60*60*1000
//             });قولي هنا انت بتقوله ايه9:04 AMتمام! 😄
// بتقوله:
// "يا response — عمل Cookie اسمها token
//  حط فيها قيمة الـ token
//  وخليها httpOnly عشان JavaScript متسرقهاش
//  وخليها تعيش 7 أيام"

// يعني بالعربي البسيط:
// res        → الـ response اللي رايحة للـ browser
// .cookie()  → حط Cookie جوا الـ response دي
// "token"    → اسم الـ Cookie
// token      → القيمة اللي جوا الـ Cookie
// httpOnly   → آمنها من السرقة
// maxAge     → عمرها 7 أيام