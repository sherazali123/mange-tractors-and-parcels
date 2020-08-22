import gql from 'graphql-tag';

export const GET_PARCEL = gql`
  query parcel($parcelId: ID!) {
    parcel(id: $parcelId) {
      id
      name
      area
      culture
      geoLocation {
        type
        coordinates
      }
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

export const GET_PARCELS = gql`
  query parcels {
    parcels(paging: {page: 1, limit: 5000}) {
      paging {
        page
        limit
        totalPages
      }
      list {
        id
        name
        area
        culture
        geoLocation {
          type
          coordinates
        }
        status
        createdAt
        updatedAt
      }
    }
  }
`;

export const SAVE_PARCEL = gql`
  mutation SaveParcel($input: SaveParcelInput!) {
    saveParcel(input: $input) {
      error
      errors
      errorMessage
      data {
        parcel {
          id
          name
          area
          culture
          geoLocation {
            type
            coordinates
          }
          status
          createdAt
          updatedAt
        }
      }
    }
  }
`;
