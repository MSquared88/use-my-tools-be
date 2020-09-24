const db  = require('../../../database/dbConfig')




module.exports = {
    getTools,
    getToolsById,
    getUserTools,
    addTool,
    deleteTool,
    updateTool, 
    addRequest,
    toolRequests
}

function getTools(){
    return db('tools')
    .where('available', true)
    .join('users', 'users.id', '=', 'tools.owner_id')
    .select('tools.id', 'users.user_name',  'tools.tool_name','tools.tool_type', 'tools.tool_description','tools.available','tools.rental_cost', 'tools.img_url')
    .orderBy('id')
} 

function getToolsById(id){
    return db('tools').where({id}).orderBy('id').first()
} 

function getUserTools(user){
    return db('tools').where('owner_id', user).orderBy('id')
}

async function addTool(tool){

    const [id] = await db('tools').insert(tool, 'id')

    return db('tools').where({ id }).first()
}

async function updateTool(id, updatedTool){
    const toolId = await db('tools')
    .where({id})
    .update(updatedTool, ['id'])
    console.log('toolId', toolId)
    
    return db('tools').where(toolId[0]).first()

}

async function deleteTool(id){
    const tool = await db('tools').where({id}).first()

    await db('tools').where({id}).delete()
    return tool
}

async function addRequest(request){
    const [id] = await db('requests').insert(request, 'id')

    return db('requests').where({ id }).first()
}

function toolRequests(user){
    return db('tools AS t')
    .join('requests AS r', 'r.tool_id', '=', 't.id')
    .join('users AS u', 'u.id', '=', 'r.requestor_id')
    .select(
        'u.user_name',
        'r.request_length',
        'tool_name',
        )
    .where('t.owner_id', user)
}