// seedAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 
const User = require('./models/User'); 
require('dotenv').config();

const createSuperAdmin = async () => {
    try {
        // 1. Connect to the database
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to the database to seed the admin...");

        // 2. Check if an admin with this email already exists to avoid duplication
        const adminEmail = "admin@bugbounty.com";
        const existingAdmin = await User.findOne({ email: adminEmail });
        
        if (existingAdmin) {
            console.log("Super admin already exists!");
            process.exit(0); // Exit the script
        }

        // 3. Hash the password (must be hashed so your Login function can verify it)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("SuperSecret123!", salt);

        // 4. Create the super admin
        const superAdmin = new User({
            name: "Super Admin",
            email: adminEmail,
            password: hashedPassword,
            role: "admin"
        });

        await superAdmin.save();
        console.log("Super admin created successfully!");
        console.log(`Email: ${adminEmail}`);
        console.log("Password: SuperSecret123!");

        process.exit(0); // Exit the script after success
    } catch (error) {
        console.log("An error occurred:", error.message);
        process.exit(1);
    }
};

createSuperAdmin();