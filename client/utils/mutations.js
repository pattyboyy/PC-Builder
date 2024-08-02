import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_BUILD = gql`
  mutation addBuild(
    $user: ID!
    $name: String!
    $cpu: String!
    $gpu: String!
    $ram: String!
    $storage: String!
    $motherboard: String!
    $powerSupply: String!
    $case: String!
    $cooling: String!
  ) {
    addBuild(
      user: $user
      name: $name
      cpu: $cpu
      gpu: $gpu
      ram: $ram
      storage: $storage
      motherboard: $motherboard
      powerSupply: $powerSupply
      case: $case
      cooling: $cooling
    ) {
      id
      user
      name
      cpu
      gpu
      ram
      storage
      motherboard
      powerSupply
      case
      cooling
      createdAt
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;
