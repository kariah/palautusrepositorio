import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
    allAuthors {
      name,
      born,
      bookCount
    }
  }
`

export const ALL_BOOKS_BY_GENRE = gql`
query allBooksByGenre($genre: String!) {
    allBooks (genre: $genre) {
      author {
        name
      },
      title,
      published 
    }
 }
`
export const ALL_BOOKS = gql`
query {
    allBooks {
      author {
        name
      },
      title,
      published,
      id
    }
 }
`

export const ME = gql`
query {
    me {
      username,
      favoriteGenre 
    }
 }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
        author {
          name
        }, 
        title,
        published,
        id
    }
  }
` 
 
export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo)  {
        name,
        born,
        bookCount
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      author {
        name
      },
      title,
      published,
      id
    }
  }
  `