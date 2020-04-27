const db  = require('../../../database/dbConfig')

module.exports = {
    getTools,
    getUserTools,
    addTool
}

function getTools(){
    return db('tools')
    .where('available', 1)
    .join('users', 'users.id', '=', 'tools.owner_id')
    .select('users.user_name', 'tools.tool_name','tools.tool_type', 'tools.tool_description','tools.available','tools.rental_cost')
} 

function getUserTools(user){
    return db('tools').where('owner_id', user)
}

async function addTool(tool){
    const [id] = await db('tools').insert(tool, 'id')

    return db('tools').where({ id }).first()
}