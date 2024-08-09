import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const CREATE_BUILD = gql`
  mutation createBuild(
    $userID: ID!
    $name: String!
    $cpu: String!
    $gpu: String!
    $ram: String!
    $storage: String!
    $motherboard: String!
    $powerSupply: String!
    $caseName: String!
    $cooling: String!
  ) {
    createBuild(
      userID: $userID
      name: $name
      cpu: $cpu
      gpu: $gpu
      ram: $ram
      storage: $storage
      motherboard: $motherboard
      powerSupply: $powerSupply
      caseName: $caseName
      cooling: $cooling
    ) {
      _id
      user {
        _id
        username
      }
      name
      cpu
      gpu
      ram
      storage
      motherboard
      powerSupply
      caseName
      cooling
      createdAt
    }
  }
`;