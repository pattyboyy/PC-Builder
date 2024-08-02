const { gql } = require('@apollo/server');

const typeDefs = `
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    builds: [Build!]!
  }

  type Build {
    id: ID!
    user: User!
    name: String!
    cpu: String!
    gpu: String!
    ram: String!
    storage: String!
    motherboard: String!
    powerSupply: String!
    case: String!
    cooling: String!
    createdAt: String!
  }

  type Query {
    user(id: ID!): User
    builds(userId: ID!): [Build!]!
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
    createBuild(userId: ID!, name: String!, cpu: String!, gpu: String!, ram: String!, storage: String!, motherboard: String!, powerSupply: String!, case: String!, cooling: String!): Build!
  }
`;

module.exports = typeDefs;