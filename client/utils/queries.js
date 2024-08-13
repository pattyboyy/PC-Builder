import { gql } from '@apollo/client';

export const QUERY_BUILDS = gql`
  query getBuild($id: ID!) {
    getBuild(id: $id) {
      id
      user
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

export const QUERY_USER = gql`
  {
    user {
      username
      email
      builds {
        _id
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
  }
`;
