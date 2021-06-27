const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  console.log('body ', body)
  
  if (body.password !== undefined && body.password.length < 3) {
    return response.status(400).json({ error: 'invalid password' })
  } 

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })


  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    // .find({}).populate('blogs', { author: 1, title: 1 })
    .find({}).populate('blogs')

  response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter