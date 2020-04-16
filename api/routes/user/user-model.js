const db = require('../../../dataBase/dbConfig')

module.exports = {
	add,
	get,
	getBy,
	update,
	remove,
}

async function add(user) {
	const [id] = await db('users').insert(user, "id")

	return db('users').where({ id }).first()
}

function get() {
	return db('users')
}

function getBy(filter) {
	return db('users').where( filter ).first()
}

function update(id) {
	
}

async function remove(id) {
	const user = await db('users').where({id}).first()

	await db('users').where({id}).delete()

	return user
}
