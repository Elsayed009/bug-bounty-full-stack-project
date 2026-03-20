const mongoose =require("mongoose");

const ReportSchema = new mongoose.Schema({
    hunterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true
    },
    programId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Program",
        required : true
    }, 
    title: {
        type: String,
        required : true,
        unique: true

    },
    description: {
        type: String,
        required : true,

    }, 
    severity: {
        type: String,
        enum: ["low", "medium", "high", "critical"],

    }, 
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",

    }, 
    proofUrl: {
        type: String,
        required : true

    }

}, {timestamps: true});

const Report = mongoose.model("Report", ReportSchema);
module.exports = Report;















