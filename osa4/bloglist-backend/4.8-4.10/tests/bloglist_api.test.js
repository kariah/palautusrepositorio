const mongoose = require('mongoose')
const supertest = require('supertest')
const { response } = require('../app')

const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan (test)",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra (test)",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
  // {
  //   title: "Canonical string reduction",
  //   author: "Edsger W. Dijkstra (test)",
  //   url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  //   likes: 12
  // },
  // {
  //   title: "First class tests",
  //   author: "Robert C. Martin (test)",
  //   url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
  //   likes: 10
  // },
  // {
  //   title: "TDD harms architecture",
  //   author: "Robert C. Martin (test)",
  //   url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
  //   likes: 0
  // },
  // {
  //   title: "Type wars",
  //   author: "Robert C. Martin (test)",
  //   url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
  //   likes: 2
  // }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

//Tehtävä 4.8
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

 
//Tehtävä 4.9
test('returned blogs include id field', async () => {
  const response = await api.get('/api/blogs')

  console.log(response.body)

  const ids = response.body.map(r => r.id) 

  const found = ids.find(x => x !== undefined).length > 0 ? 1 : undefined  
  expect(found).toBeDefined(); 

})

//Tehtävä 4.10
test('blog can be added ', async () => {
  const newBlog = {
    title: "React patterns",
    author: "Michael Chan (test, add new)",
    url: "https://reactpatterns.com/",
    likes: 7
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const authors = response.body.map(r => r.author)

  console.log(response.body)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(authors).toContain(
    'Michael Chan (test, add new)'
  )
})
 
afterAll(() => {
  mongoose.connection.close()
})