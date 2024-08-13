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
    caseName: String!
    cooling: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(id: ID!): User    
    builds: [Build]
    buildsByUserId(userId: ID!): [Build!]!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBuild(user:String!, name:String!, cpu:String!, gpu:String!, ram:String!, storage:String!, motherboard:String!, powerSupply:String!, caseName:String!, cooling:String!): Build
  }
`;

module.exports = typeDefs;