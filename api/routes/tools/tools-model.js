const db  = require('../../../database/dbConfig')

module.exports = {
    getTools,

}

const getTools = () => {
    return db('tools').where('available', 1)
}