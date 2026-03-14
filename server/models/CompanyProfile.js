const mongoose = require("mongoose");
const CompanyProfileSchema= new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    comName: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    description: String,
    verified: { // check if it first time or not
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const CompanyProfile = mongoose.model("CompanyProfile", CompanyProfileSchema);
module.exports = CompanyProfile;










