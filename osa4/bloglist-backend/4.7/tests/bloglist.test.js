const listHelper = require('../utils/list_helper')

describe('blogs count', () => {
  const blogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12
    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10
    },
    {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0
    },
    {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2
    }
  ]



  // tests
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })

  test('totalLikes returns 36', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })

  test('totalLikes returns favourite blog with most likes', () => {
    const expectedResult = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12
    }

    const result = listHelper.favoriteBlog(blogs)

    console.log("totalLikes result: ", result)

    expect(result).toEqual(expectedResult)
  })

  test('mostBlogs returns favourite blog with biggest count by author', () => {
    const expectedResult = {
      author: "Robert C. Martin",
      blogs: 3
    }

    const result = listHelper.mostBlogs(blogs)

    console.log('mostBlogs result ', result)

    expect(result).toEqual(expectedResult)
  })
 
  // test.only('mostBlogs returns author with most likes', () => {
    test('mostBlogs returns author with most likes', () => {
    const expectedResult = { author: 'Edsger W. Dijkstra', likes: 17 }

    const result = listHelper.mostLikes(blogs)

    console.log('mostLikes result ', result)

    expect(result).toEqual(expectedResult)
  })

})