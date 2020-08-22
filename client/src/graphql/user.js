import gql from 'graphql-tag';

export const GET_USER = gql`
  query admin($token: String) {
    admin(token: $token) {
      id
      firstName
      lastName
      fullName
      email
      contactNumber
      status
      createdAt
      updatedAt
    }
  }
`;

export const LOGIN = gql`
  mutation($input: LoginInput!) {
    login(input: $input) {
      error
      errors
      errorMessage
      token
      data {
        admin {
          id
          firstName
          lastName
          fullName
          email
          contactNumber
          status
          createdAt
          updatedAt
        }
      }
    }
  }
`;
