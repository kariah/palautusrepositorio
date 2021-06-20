const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


router.get('/', async (request, response) => {  
  console.log('/testing')
  return response.status(200) 
})

router.post('/reset', async (request, response) => {  
  console.log('/testing/reset')
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router