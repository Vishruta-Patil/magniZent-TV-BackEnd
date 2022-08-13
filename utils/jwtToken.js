var jwt = require("jsonwebtoken");

exports.getToken = (_id) => {
    const token = jwt.sign(
        { _id },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        })
    return token
}