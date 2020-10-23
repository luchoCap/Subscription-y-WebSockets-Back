const {gql} = require('apollo-server-express');


module.exports.typeDefs = gql`

type Book {
    title: String
    author: String
  }


  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }


type Mutation{
    addBook(title:String, author:String): Book
}

type Subscription {
  itemAdded: Book
}

`
