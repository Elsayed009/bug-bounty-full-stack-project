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
        unique: true
    },
    role: {
        type: String,
        enum: ["admin", "company", "hunter"],
        default: "hunter"
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const User = mongoose.model("User", UserSchema);
module.exports = User;