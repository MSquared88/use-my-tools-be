module.exports = (req, res, next) => {
    const {username, password, email} = req.body

    if(!username || !password) {
        res.status(400).json({message: 'username, password, and email are required fields'})
    }
    else {
        next()
    }
}