module.exports = (req, res, next) => {
    const {user_name, password, email, street, } = req.body

    if(!user_name || !password || !email || !street) {
        res.status(400).json({message: 'username, password, and email are required fields'})
    }
    else {
        next()
    }
}