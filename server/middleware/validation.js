const Joi = require("joi");
// register joi
const registerSchema= Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().max(100).required(),
    password: Joi.string().min(6).max(100).required(),
    role: Joi.string().lowercase().valid("company","admin", "hunter").required(),

});

// login joi
const loginSchema = Joi.object({
    email: Joi.string().email().max(100).required(),
    password: Joi.string().min(6).max(100).required()
});

//company profile
const companyProfileSchema = Joi.object({
    comName: Joi.string().min(3).max(100).required(),
    website: Joi.string().uri().required(),
    description: Joi.string().max(500)
});
//hunter profile
const hunterProfileSchema = Joi.object({
    nickName: Joi.string().min(3).max(30).required(),
    bio: Joi.string().max(500),
    skills: Joi.array().items(Joi.string()).required()
});
// report profile
const reportSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().required(),
    severity: Joi.string().lowercase().valid("low", "medium", "high", "critical").required(),
    proofUrl: Joi.string().uri().required()
});

// statusSchema
const statusSchema = Joi.object({
    status: Joi.string().valid("accepted", "rejected").required()
});

// program
const programSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(1000).required(),
    scope: Joi.array().items(Joi.string()).required(),
    rewards: Joi.object({
        low: Joi.number().required(),
        medium: Joi.number().required(),
        high: Joi.number().required(),
        critical: Joi.number().required()
    }).required(),
    isActive: Joi.boolean()
});

// validate 
const validate = (schema) =>{
    // console.log("validate called");
    return (req, res, next)=>{
        // console.log("middleware running");
        const {error} = schema.validate(req.body, {abortEarly: false});

        if(error) {
            const errMsg = error.details.map((errItem)=>errItem.message)
            // return res.status(400).json({msg: error.details[0].message});
        return res.status(400).json({msg: "data entered is not right", errors: errMsg});
        }
        next();
    };
};

module.exports = {validate,loginSchema, registerSchema,companyProfileSchema ,hunterProfileSchema ,reportSchema,statusSchema, programSchema};