const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
// const { ApolloServerPluginSchemaReporting } = require('apollo-server-core/dist/plugin/schemaReporting')
const { v1: uuid } = require('uuid')


// const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

// const JWT_SECRET = '7bihDTVK93ljVUBc2MWW'

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
          return await Book.find( { genres: { $in: [ args.genre ] } } ) 
      }
      else
      {
          return await Book.find()
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
      const book = new Book({ ...args })
 
      try { 
        let author = await Author.findOne ({ name: args.author }) 
       
        if (!author) {   
          author = new Author({ ...args, name: args.author })
          await author.save() 
          book.author = author
          console.log('author uusi ', author)
        } 
        else
        { 
          book.author = author
          console.log('author ok ', author)
        }
        
        await book.save() 
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
  
      return book
    },

    editAuthor: async (root, args) => {
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
    }  
  } 
} 
  
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: async ({ req }) => {
  //   const auth = req ? req.headers.authorization : null
  //   if (auth && auth.toLowerCase().startsWith('bearer ')) {
  //     const decodedToken = jwt.verify(
  //       auth.substring(7), JWT_SECRET
  //     )
  //     // const currentUser = await User
  //     //   .findById(decodedToken.id).populate('friends')
  //     // return { currentUser }
  //     const currentUser = await User
  //     //.findById(decodedToken.id).populate('friends')
  //     return { currentUser }
  //   }
  // }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
