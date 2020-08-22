import gql from 'graphql-tag';

export const GET_TRACTOR = gql`
  query tractor($tractorId: ID!) {
    tractor(id: $tractorId) {
      id
      name
      status
      createdAt
      updatedAt
    }
    __type(name: "Status") {
      enumValues {
        name
      }
    }
  }
`;

export const GET_TRACTORS = gql`
  query tractors {
    tractors(paging: {page: 1, limit: 10}) {
      paging {
        page
        limit
        totalPages
      }
      list {
        id
        name
        status
        createdAt
        updatedAt
      }
    }
  }
`;

export const SAVE_TRACTOR = gql`
  mutation SaveTractor($input: SaveTractorInput!) {
    saveTractor(input: $input) {
      error
      errors
      errorMessage
      data {
        tractor {
          id
          name
          status
          createdAt
          updatedAt
        }
      }
    }
  }
`;
