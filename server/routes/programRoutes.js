const express = require("express");
const router = express.Router();
const {verifyToken} = require("../middleware/auth.middleware");

const {  deleteProgram,
    updateProgram,
    getProgram,
    getPrograms,
    createProgram}= require("../controllers/programController")
    const {validate, programSchema} = require("../middleware/validation");
    router.post("/program", verifyToken, validate(programSchema), createProgram);
    router.get("/program",verifyToken, getPrograms);
    router.get("/program/:id",verifyToken, getProgram);
    router.put("/program/:id", verifyToken, validate(programSchema), updateProgram);
    router.delete("/program/:id",verifyToken, deleteProgram);
    module.exports = router;

