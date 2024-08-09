const { gql } = require('@apollo/server');

const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    builds: [Build!]
  }

  type Build {
    _id: ID!
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

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(id: ID!): User
    builds(userId: ID!): [Build!]!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createBuild(userId: ID!, name: String!, cpu: String!, gpu: String!, ram: String!, storage: String!, motherboard: String!, powerSupply: String!, case: String!, cooling: String!): Build!
  }
`;

module.exports = typeDefs;