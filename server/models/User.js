const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        // unique: true  // never do this again cause every profile you will do will be saved as a hunter not company or admin
    },
    role: {
        type: String,
        enum: ["admin", "company", "hunter"],
        required:true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const User = mongoose.model("User", UserSchema);
module.exports = User;