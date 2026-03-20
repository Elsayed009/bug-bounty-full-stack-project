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
