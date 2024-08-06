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
      userID: $user
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
      id
      user {
        _id
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

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;
