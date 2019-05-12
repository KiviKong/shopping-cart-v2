const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { makeExecutableSchema } = require('graphql-tools');

const baseSchemas = `
type Query {
  dummy: [String]
}
type Mutation {
  dummy: [String]
}
type Subscription {
  dummy: [String]
}
type Success {
  success: Boolean
}
type PageInfo {
  pages: Int!
  total: Int!
  current_page: Int!
}
schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
`;
const schemas = glob.sync('**/*.gql', { cwd: `${__dirname}` })
  .map(f =>fs.readFileSync(path.join(`${__dirname}`, f), 'utf8'));

const resolvers = glob.sync('**/resolver.js', { cwd: `${__dirname}` })
  .map(f => require(path.join(`${__dirname}`, f)))
  .reduce((accumulator, currentValue) => {
    Object.keys(currentValue).forEach(operationType => {
      if (!accumulator[operationType] ) {
        accumulator[operationType] = {};
      }

      Object.assign(accumulator[operationType], currentValue[operationType]);
    });

    return accumulator;
  });

const typeDefs = [
  baseSchemas,
  ...schemas
];

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
