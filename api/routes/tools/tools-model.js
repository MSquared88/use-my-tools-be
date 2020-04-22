const db  = require('../../../database/dbConfig')

module.exports = {
    getTools,

}

function getTools(){
    return db('tools').where('available', 1)
} 