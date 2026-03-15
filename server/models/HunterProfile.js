const mongoose = require("mongoose");


const HunterProfileSchema = new mongoose.Schema({
nickName: {
    type: String,
    required: true,
    unique: true
},
bio: String,
skills: {
    type: Array,
    required: true,
},
reputation: {
    type: Number,
    default: 0
},
userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
},
verified: {
    type: Boolean,
    default: false,
}

}, {timestamps: true})


const HunterProfile = mongoose.model("HunterProfile", HunterProfileSchema);
module.exports = HunterProfile;

// : هنا بتقوله حاجتين : 
// 1. mongoose.model("HunterProfile", HunterProfileSchema)
//    ← اعمل Model اسمه "HunterProfile"
//    ← وشكله زي الـ HunterProfileSchema

// 2. module.exports = HunterProfile
//    ← خلي الملف ده يصدّر الـ Model
//    ← عشان أي ملف تاني يعمل require ويستخدمه