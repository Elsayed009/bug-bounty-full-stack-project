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














