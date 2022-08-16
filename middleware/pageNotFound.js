const pageNotFound = (req,res, next) => {
    res.status(404).json({status: false, message:"page not found"})
    next()
}

module.exports = pageNotFound