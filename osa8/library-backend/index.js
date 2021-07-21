const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server') 
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const JWT_SECRET = '7bihDTVK93ljVUBc2MWW'
const MONGODB_URI = 'mongodb+srv://fullstack:3fXMiNhiDLZGqYxT@cluster0.hjz9y.mongodb.net/library?retryWrites=true'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    born: Int
    id: String!
    bookCount: Int!
  }
 
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    booksCount: Int!,
    authorsCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String
      published: Int!
      genres: [String!]
    ): Book 
    editAuthor( 
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token

  }
`   

const resolvers = {
  Query: {
    booksCount: () => Book.collection.countDocuments(),
    authorsCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {    
      // let booksToFilter = await Book.find()   
      // if (args.author)
      // {
      //   booksToFilter = booksToFilter.filter(book => book.author === args.author) 
      // }
      // if (args.genre)
      // {
      //   booksToFilter = booksToFilter.filter(book => book.genres.includes(args.genre))   
      // }  
      // return booksToFilter 

      if (args.genre)
      {  
          return await Book.find( { genres: { $in: [ args.genre ] } } ).populate('author', { name: 1 }) 
      }
      else
      {
          return await Book.find().populate('author', { name: 1 })
      }
    }, 
    allAuthors: async (root) => {    
      return Author.find()
    }  
  },  
  Author: {
    bookCount: async (root) => { 
      const booksByAuthor = await Book.find({author: root.id}) 
      // console.log('booksByAuthor: ', booksByAuthor)
      // console.log('bookCount: ', booksByAuthor.length)
      return booksByAuthor.length
    }
  },
  Mutation: { 
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const book = new Book({ ...args })
 
      try { 
        let author = await Author.findOne ({ name: args.author }) 
       
        if (!author) {   
          author = new Author({ ...args, name: args.author })
          await author.save()  
        }

        book.author = author
        
        await book.save() 
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
  
      return book
    },

    editAuthor: async (root, args, context) => {
      // console.log('context ', context)
      console.log('test')
      console.log('context ', context)

      const currentUser = context.currentUser

      console.log('currentUser ', currentUser)

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo

      try {
        await author.save()
        return author
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
   
      const token  = jwt.sign(userForToken, JWT_SECRET)
      
      console.log('token ', token)

      return { value: token }
    },
  } 
} 
  
const server = new ApolloServer({
  typeDefs,
  resolvers, 
  context: async ({ req }) => {

    const auth = req ? req.headers.authorization : null

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
       const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )

      const currentUser = await User
      .findById(decodedToken.id) 
      return { currentUser }
    }
  }
})
 
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})