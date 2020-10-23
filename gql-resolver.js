
const { PubSub } = require('apollo-server');

const pubsub = new PubSub();
const { withFilter } = require('graphql-subscriptions');

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

module.exports.resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
    addBook: (_, { title, author }) => {
      console.log(title, author)
      return new Promise((resolve, reject) => {
        setTimeout(function () {
          if (title && author) {
            let book = {
              title,
              author
            }
            books.push(book)
            pubsub.publish('itemAdded', book);
            resolve(book)
          } else {
            reject('Faltan parametros')
          }
        }, 5000);


      })

    }
  },
  Subscription: {
    itemAdded: {
      // resolve: (payload) => {
      //     return payload; //Manipulate at you wish
      // },
      // subscribe: withFilter(
      // () => pubsub.asyncIterator('itemAdded'), 
      // (payload, variables) => {
      //     return payload.bingoId === variables.bingoId;
      //  }),
      resolve: (payload) => {
        return payload; //Manipulate at you wish
      },
      subscribe: () => pubsub.asyncIterator('itemAdded')

    }
  },
};