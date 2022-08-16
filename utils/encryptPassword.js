const bcrypt = require('bcryptjs');

exports.encryptPassword = async(password) => {
    const hashPassword = await bcrypt.hash(password, 10)
    return hashPassword
}

exports.validatePassword = async(password, hash) => {
    const isValidate = await bcrypt.compare(password, hash)
    return isValidate
}