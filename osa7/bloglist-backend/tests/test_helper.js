const Blog = require('../models/blog')
const User = require('../models/user')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const createInitialBlogs = (user) => {  

  const initialBlogs = [{
      title: "React patterns",
      author: "Michael Chan (test)",
      url: "https://reactpatterns.com/",
      likes: 7,
      user: user._id
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra (test)",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      user: user._id
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra 2 (test)",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 2,
      user: user._id
    },
  ]
 
  return initialBlogs
}

 

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}  

const createTestUser = async () => {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash("salainen", saltRounds)

  const user = new User({
    username: 'khtest',
    name: 'Testinen',
    passwordHash,
  })

  const savedUser = await user.save()
  return savedUser
}

const createToken = async (user) => {
  const userForToken = {
    username: user.username,
    id: user._id,
  }
  token = jwt.sign(userForToken, process.env.SECRET)
  return token
}

module.exports = {
  createTestUser,
  createInitialBlogs,
  blogsInDb,
  usersInDb,
  createToken
}