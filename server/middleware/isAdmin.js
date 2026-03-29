const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const isAdmin = async (req, res, next) => {
    try {
        // extract the token from the cookies
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ msg: "Unauthorized: No token provided" });

        // verify and decode the token to get the user payload
        const decoded = jwt.verify(token, secret);

        //  role Validation: Check if the user has admin privileges
        if (decoded.role !== "admin") {
            // 🌟 Note: Using 403 (Forbidden) instead of 401 because the user is known, but lacks permissions
            return res.status(403).json({ msg: "Forbidden: Admin access required" });
        }

        // if admin, attach the decoded user data to the request object and proceed
        req.user = decoded; 
        next();

    } catch (err) {
        return res.status(401).json({ msg: "Unauthorized: Invalid or expired token" });
    }
};

module.exports = isAdmin;