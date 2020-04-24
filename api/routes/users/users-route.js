const express = require('express')

//auth
const bcrypt = require('bcryptjs')

const createToken = require('../../Utils/auth/createToken')

//middleware
const restricted = require('../../Utils/auth/restricted-middleware')
const validateUser = require('../../Utils/auth/validateUser-middleware')

//dataBase
const usersModel = require('./users-model')

const router = express.Router()

router.post('/user/register', validateUser, (req, res) => {
	const user = req.body

	const hash = bcrypt.hashSync(user.password, 10)
	user.password = hash

	usersModel.add(user)
		.then(user => {
			res.status(201).json(user)
		})
		.catch(err => {
			res.status(500).json({ message: 'could not add user to database', err })
		})
})

router.post('/user/login', (req, res) => {
	const { user_name, password } = req.body

	usersModel.getBy( {user_name} )
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)){
				const  token  = createToken(user)
				res.status(200).json({message: `Welcome ${user.username} to  Use my Tools`, token})
			} else {
				res.status(401).json({message: "invalid credentials"})
			}
		})
})

router.get('/user/restricted', restricted, (req, res) => {
	usersModel.get().first()
		.then(users => {
			res.status(200).json(users)
		})

		.catch(err => {
			res.status(500).json({ message: 'could not get users', err })
		})
})

router.put('/user/update', validateUser, restricted, (req, res) => {
	
})

router.delete('/user/delete', restricted, (req, res) => {
	const id = req.userid

	usersModel.remove(id)
		.then(user => {
			if (user) {
				res.status(200).json(user)
			} else {
				res.status(400).json({ message: "the user with that id does not exsist" })
			}
		})
		.catch(err => {
			res.status(500).json({ message: 'could not delete user', err })
		})
})


module.exports = router