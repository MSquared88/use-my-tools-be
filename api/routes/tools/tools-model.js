const db  = require('../../../database/dbConfig')

module.exports = {
    getTools,
    getUserTools
}

function getTools(){
    return db('tools').where('available', 1)
} 

function getUserTools(user){
    return db('tools').where('owner_id', user)
}