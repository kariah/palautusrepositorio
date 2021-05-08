const mongoose = require('mongoose')
const supertest = require('supertest')
const {
  response
} = require('../app')

const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')



beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()
})

describe('viewing notes and content', () => {
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

    // console.log(response.body)

    const ids = response.body.map(r => r.id)

    const found = ids.find(x => x !== undefined).length > 0 ? 1 : undefined
    expect(found).toBeDefined();

  })
})

describe('Adding and updating notes', () => {
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

    // console.log(response.body)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(authors).toContain(
      'Michael Chan (test, add new)'
    )


  })

  //Tehtävä 4.14
  test('updating likes-value to blog', async () => {
    let response = await api.get('/api/blogs')

    const blogs = response.body.map(r => r)
    const blogToUpdate = blogs[0]
    const startLikesValue = blogToUpdate.likes

    blogToUpdate.likes += 1

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)


    response = await api.get('/api/blogs')
    const updatedBlog = response.body.map(r => r).find(x => x.id == blogToUpdate.id)

    //  console.log("updatedBlog ", updatedBlog)

    expect(updatedBlog.likes).toBe(startLikesValue + 1)
  })


  //Tehtävä 4.11
  test('if blog.likes is null then blog.likes is set to 0', async () => {
    const newBlog = {
      title: "Test title",
      author: "Edsger W. Dijkstra 3 (test)",
      url: "Test url"
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    // console.log(response.body)

    let testBlogs = response.body.filter(x => x.likes === null)

    let expected = 0
    if (testBlogs != undefined) {
      expected = testBlogs.length
    }
    expect(expected).toBe(0)
  })


  //Tehtävä 4.12
  test('blog without title and url not added ', async () => {
    const newBlog = {
      author: "Edsger W. Dijkstra 3 (test)",
      likes: 999,
    }

    const respose = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

})


//4.13
describe('deletion of blog', () => {

  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    // console.log('blogToDelete.id: ', blogToDelete.id)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const response = await api.get('/api/blogs')

    expect(response).not.toContain(blogToDelete.id)
  })
})
 

afterAll(() => {
  mongoose.connection.close()
})