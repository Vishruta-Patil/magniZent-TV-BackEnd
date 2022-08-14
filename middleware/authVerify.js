var jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

exports.authVerify = (req,res,next) => {
    const token = req.headers.token

    if(!token) {
        return res.status(404).json({
            success: false,
            message: "Authorization Token does not exist", 
          });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        req._id = decodedToken._id
        next()
    } catch (error) {
        res.status(403).json({ success: false, message: "Invalid token" });
      }
}