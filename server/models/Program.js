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