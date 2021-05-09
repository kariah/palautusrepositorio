const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const jwt = require('jsonwebtoken')
 
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

//TODO: Muuta async await-käsittely
// blogsRouter.get('/', (request, response) => {
//   Blog.find({}).then(blogs => {
//     response.json(blogs.map(blog => blog.toJSON()))
//   })
// })

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', {
      username: 1,
      name: 1
    })
    // .find({}).populate('user')

  response.json(blogs.map(note => note.toJSON()))
})

//TODO: Muuta async await-käsittely
// blogsRouter.get('/:id', (request, response, next) => {
//   Blog.findById(request.params.id)
//     .then(blog => {
//       if (blog) {
//         response.json(blog.toJSON())
//       } else {
//         response.status(404).end()
//       }
//     })
//     .catch(error => next(error))
// })


blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response, next) => {
  // const body = request.body

  // const blog = new Blog({
  //   title: body.title,
  //   author: body.author,
  //   url: body.url,
  //   likes: body.likes
  // })

  // blog.save()
  //   .then(savedBlog => {
  //     response.json(savedBlog.toJSON())
  //   })
  //   .catch(error => next(error))

  const body = request.body

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  // const user = await User.findById(body.userId)

  // const note = new Note({
  //   content: body.content,
  //   important: body.important === undefined ? false : body.important,
  //   date: new Date(),
  //   user: user._id
  // })

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog.toJSON())
})

// blogsRouter.delete('/:id', (request, response, next) => {
//   Blog.findByIdAndRemove(request.params.id)
//     .then(() => {
//       response.status(204).end()
//     })
//     .catch(error => next(error))
// })

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

// blogsRouter.put('/:id', (request, response, next) => {
//   const body = request.body

//   const blog = {
//     content: body.content,
//     important: body.important,
//   }

//   Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
//     .then(updatedBlog => {
//       response.json(updatedBlog.toJSON())
//     })
//     .catch(error => next(error))
// })


blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  // const blog = {
  //   title: body.title,
  //   author: body.author,
  //   likes: body.likes
  // } 
  //const updatedBlog = await Blog.findByIdAndUpdate({_id: request.params.id}, blog, { new: true }) 

  const updatedBlog = await Blog.findByIdAndUpdate({
    _id: request.params.id
  }, {
    likes: body.likes
  }, {
    new: true
  })

  response.json({
    updatedBlog
  })

})

module.exports = blogsRouter