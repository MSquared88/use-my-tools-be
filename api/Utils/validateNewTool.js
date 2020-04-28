module.exports = (req, res, next) => {
    const {tool_name, tool_type, rental_cost} = req.body

    if(!tool_name || !tool_type || !rental_cost) {

        res.status(400).json({message: 'tool_name, tool_type, and rental_cost are required fields'})
    }
    else {

        next()
    }
}