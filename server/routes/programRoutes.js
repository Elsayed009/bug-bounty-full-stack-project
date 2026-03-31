const express = require("express");
const router = express.Router();
const {verifyToken} = require("../middleware/auth.middleware");
    const {validate, programSchema} = require("../middleware/validation");
const {  deleteProgram,
    updateProgram,
    getProgram,
    getPrograms,
    createProgram,
    getAllActivePrograms
}= require("../controllers/programController")
    // router.post("/program",verifyToken, createProgram);
    router.post("/program", verifyToken, validate(programSchema), createProgram);
    router.get("/programs",verifyToken, getPrograms);
    router.get("/programs/:id",verifyToken, getProgram);
    // router.put("/program/:id",verifyToken, updateProgram);
    router.put("/program/:id", verifyToken, validate(programSchema), updateProgram);
    router.delete("/program/:id",verifyToken, deleteProgram);
    router.delete("/active", getAllActivePrograms);

    module.exports = router;

