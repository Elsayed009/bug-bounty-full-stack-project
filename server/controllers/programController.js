const Program = require("../models/Program");
const CompanyProfile = require("../models/CompanyProfile");
// errorhandler
const errHandler = (res, err)=>{
     res.status(500).json({ msg: "server down", details: err.message });
}

//Progrm endpoints code and curd logic

//createProgram endpoint
const createProgram = async(req, res)=>{
    try{
        const {title, description,scope,rewards} = req.body;
        const userId = req.userData.id;
        const company = await CompanyProfile.findOne({userId});
        if(!company) return res.status(404).json({msg: "company not found"});
        const companyId = company.id;
        const program = await Program.create({
            title, description,scope, rewards, companyId
        });
        res.status(201).json({msg: "program created", data: program});
        

    }catch(err){
        errHandler(res, err);
    }
}




//getPrograms endpoint
const getPrograms = async(req, res)=>{
    try{
        const userId = req.userData.id;
        const company = await CompanyProfile.findOne({userId});
        if(!company) return res.status(404).json({msg: "user not found"});
        const companyId = company.id
        const programs = await Program.find({companyId})
        res.status(200).json({msg: "all programs ", data: programs});
    }catch(err){
        errHandler(res, err);
    }
}


// getProgram
const getProgram = async(req, res)=>{
    try{
        const id = req.params.id;
        const program = await Program.findById(id);
        if(!program) return res.status(404).json({msg: "not found"});
        res.status(200).json({msg: "program found", data: program});
    }catch(err){ errHandler(res, err); }
}

// updateProgram
const updateProgram = async(req, res)=>{
    try{
        const {title, description, scope, rewards,isActive} = req.body;
        const id = req.params.id;
        const program = await Program.findById(id);
        if(!program) return res.status(404).json({msg: "not found"});
        const updated = await Program.findByIdAndUpdate(id, {$set:{title, description, scope, rewards,isActive}}, {new: true});
        res.status(200).json({msg: "program updated", data: updated});
    }catch(err){ errHandler(res, err); }
}

// deleteProgram
const deleteProgram = async(req, res)=>{
    try{
        const id = req.params.id;
        const program = await Program.findById(id);
        if(!program) return res.status(404).json({msg: "not founded"});
        await Program.findByIdAndDelete(id);
        res.status(200).json({msg: "program deleted"});
    }catch(err){ errHandler(res, err); }
}
// Public endpoint for hunters (no auth required)
const getAllActivePrograms = async (req, res) => {
  try {
    const programs = await Program.find({ isActive: true })
      .populate('companyId', 'comName website');
    res.status(200).json({ msg: "active programs found", data: programs });
  } catch (err) {
    res.status(500).json({ msg: "server down", details: err.message });
  }
};
module.exports = {
    deleteProgram,
    updateProgram,
    getProgram,
    getPrograms,
    createProgram,
    getAllActivePrograms,
}









// // updateProgram
// const updateProgram = async (req, res) => {
//     try {
//         const id = req.params.id;
        
//         // 1. نتأكد إن البرنامج موجود الأول
//         const program = await Program.findById(id);
//         if (!program) return res.status(404).json({msg: "not found"});

//         // 2. نحدث الداتا كلها باللي جاي من req.body (لأن Joi مفلترها خلاص)
//         const updated = await Program.findByIdAndUpdate(
//             id, 
//             { $set: req.body }, 
//             { new: true }
//         );

//         res.status(200).json({msg: "program updated", data: updated});
//     } catch (err) { 
//         errHandler(res, err); 
//     }
// }








// //getPrograms endpoint (Smart: Company vs Hunter)
// const getPrograms = async (req, res) => {
//     try {
//         const userId = req.userData.id;
//         const role = req.userData.role; // نفترض إن الـ role متخزن في التوكن بتاعك

//         // 1. لو اليوزر شركة (Company)
//         if (role === 'company') {
//             const company = await CompanyProfile.findOne({ userId });
//             if (!company) return res.status(404).json({ msg: "Company profile not found" });
            
//             // تجيب برامج الشركة دي بس (سواء نشطة أو لأ عشان يقدروا يعدلوها)
//             const programs = await Program.find({ companyId: company.id });
//             return res.status(200).json({ msg: "Company programs", data: programs });
//         }

//         // 2. لو اليوزر هنتر (Hunter)
//         if (role === 'hunter') {
//             // الهنتر يشوف كل البرامج اللي حالتها نشطة (isActive: true)
//             // واستخدمنا populate عشان نجيب اسم الشركة بدل الـ ID (لو حابب تعرضه في الفرونت)
//             const programs = await Program.find({ isActive: true })
//                                         .populate('companyId', 'name'); 
//             return res.status(200).json({ msg: "Available programs for hunters", data: programs });
//         }

//         // 3. لو أدمن (Admin) يشوف كل حاجة
//         if (role === 'admin') {
//             const programs = await Program.find({});
//             return res.status(200).json({ msg: "All programs (Admin)", data: programs });
//         }

//         // لو role مش معروف
//         return res.status(403).json({ msg: "Unauthorized role" });

//     } catch (err) {
//         errHandler(res, err);
//     }
// }
