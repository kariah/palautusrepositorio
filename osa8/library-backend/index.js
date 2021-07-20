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


// let authors = [
//   {
//     name: 'Robert Martin',
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821
//   },
//   { 
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   { 
//     name: 'Sandi Metz', // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ]

// /*
//  * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
//  * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
// */

// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ['agile', 'patterns', 'design']
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'patterns']
//   },  
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'design']
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'crime']
//   },
//   {
//     title: 'The Demon ',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'revolution']
//   },
// ]
 
// type Book {
//   title: String!
//   published: Int!
//   author: String!
//   id: String!
//   genres: [String!]
// }  


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
    allBooks: (root, args) => {    
      let booksToFilter = books
      if (args.author)
      {
        booksToFilter = booksToFilter.filter(book => book.author === args.author)
      }
      if (args.genre)
      {
        booksToFilter = booksToFilter.filter(book => book.genres.includes(args.genre))   
      } 
      
      return booksToFilter 
    }, 
    allAuthors: (root) => {  
      return authors  
    }  
  },  
   Author: {
    bookCount: (root) => books.filter(b => b.author === root.name).length
  },
  Mutation: {
    // addBook: (root, args) => {
    //   if (books.find(b => b.title === args.title)) {
    //     throw new UserInputError('Title must be unique', {
    //       invalidArgs: args.title,
    //     })
    //   }

    //   const book = { ...args, id: uuid() }   
    //   books = books.concat(book)
 
    //   //If author needed to add
    //   if (!authors.find(a => a.name === args.author)) { 
    //     const author = { ...args, name: args.author, id: uuid() }   
    //     authors = authors.concat(author) 
    //   } 

    //   return book
    // },

    addBook: async (root, args, context) => {
      const book = new Book({ ...args })

      // const currentUser = context.currentUser
  
      // if (!currentUser) {
      //   throw new AuthenticationError("not authenticated")
      // }
  
      try {
        let author = new Author({ ...args, name: args.author })

        //If author needed to add
        addedAuthor = await Author.find({ name: args.author }) 
 
        if (addedAuthor.length === 0) {  
          // author = { ...args, name: args.author, id: uuid() }   
          //authors = authors.concat(author) 
          author = await author.save() 
        } 
 
        book.author = author
        await book.save()
        //currentUser.friends = currentUser.friends.concat(person)
        //await currentUser.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
  
      return book
    },

    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
      if (!author) {
        return null
      }
  
      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      return updatedAuthor
    }  
  } 
} 
 

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// })
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