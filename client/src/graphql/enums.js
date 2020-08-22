import gql from 'graphql-tag';

export const GET_ENUMS = gql`
  query Enums {
    __type(name: "Status") {
      enumValues {
        name
      }
    }
  }
`;
