import gql from 'graphql-tag';

export const GET_TRACTORS_AND_PARCEL = gql`
  query tractorsAndParcels {
    getActiveTractorsAndParcels {
      tractors {
        id
        name
      }
      parcels {
        id
        name
      }
    }
  }
`;

export const GET_TRACTOR_PARCEL = gql`
  query tractorParcel($tractorParcelId: ID!) {
    tractorParcel(id: $tractorParcelId) {
      id
      area
      tractor {
        id
        name
      }
      parcel {
        id
        name
        culture
      }
      geoLocation {
        type
        coordinates
      }
      processOn
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

export const GET_TRACTOR_PARCELS = gql`
  query processedParcels($params: TractorParcelsFilter) {
    processedParcels(paging: {page: 1, limit: 5000}, params: $params) {
      paging {
        page
        limit
        totalPages
      }
      list {
        id
        area
        tractor {
          id
          name
        }
        parcel {
          id
          name
          culture
        }
        geoLocation {
          type
          coordinates
        }
        processOn
        createdAt
        updatedAt
      }
    }
  }
`;

export const SAVE_TRACTOR_PARCEL = gql`
  mutation SaveTractorParcel($input: SaveTractorParcelInput!) {
    saveTractorParcel(input: $input) {
      error
      errors
      errorMessage
      data {
        tractorParcel {
          id
          area
          tractor {
            id
            name
          }
          parcel {
            id
            name
          }
          geoLocation {
            type
            coordinates
          }
          createdAt
          updatedAt
        }
      }
    }
  }
`;
