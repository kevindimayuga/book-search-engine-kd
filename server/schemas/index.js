// define our typeDefs and resolvers and export them for use in our server.js file
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

module.exports = { typeDefs, resolvers };