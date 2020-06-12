const { ApolloServer } = require('apollo-server');
const { typeDefs, resolvers } = require('./schema');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(3333).then(({ url }) => {
  console.log(`🚀 Server running at ${url}`);
});
