const db  = require('../../../database/dbConfig')

module.exports = {
    getTools,
    getToolsById,
    getUserTools,
    addTool,
    deleteTool
}

function getTools(){
    return db('tools')
    .where('available', true)
    .join('users', 'users.id', '=', 'tools.owner_id')
    .select('tools.id', 'users.user_name',  'tools.tool_name','tools.tool_type', 'tools.tool_description','tools.available','tools.rental_cost')
} 

function getToolsById(id){
    return db('tools').where({id})
} 

function getUserTools(user){
    return db('tools').where('owner_id', user)
}

async function addTool(tool){
    const [id] = await db('tools').insert(tool, 'id')

    return db('tools').where({ id }).first()
}

async function deleteTool(id){
    const tool = await db('tools').where({id}).first()

    await db('tools').where({id}).delete()
    return tool
}