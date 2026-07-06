const authMiddleware = (req , res , next) => {
    if (!req.cookies.userId) {
        res.redirect('/login')
    }else{
        next()
    }
}
module.exports = authMiddleware;    