import React, {Component} from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import './../../App.css';
import {Query} from 'react-apollo';
import {GET_TRACTOR_PARCELS} from '../../graphql/tractorParcel';

class Create extends Component {
  render() {
    return (
      <Query query={GET_TRACTOR_PARCELS}>
        {({loading, error, data}) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          return (
            <div className="container">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">
                    Processed Parcels{' '}
                    <Link to="/processed-parcel/create" className="subLink">
                      Process Parcel
                    </Link>
                  </h3>
                </div>
                <div className="panel-body">
                  <table className="table table-stripe">
                    <thead>
                      <tr>
                        <th>Tractor</th>
                        <th>Parcel</th>
                        <th>Prossed On</th>
                        <th>Area</th>
                        <th>Longitude</th>
                        <th>Latitude</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.processedParcels.list.map(
                        (prossedParcel, index) => (
                          <tr key={index}>
                            <td>{prossedParcel.tractor.name}</td>
                            <td>{prossedParcel.parcel.name}</td>
                            <td>
                              {moment(prossedParcel.processOn).format(
                                'YYYY-MM-DD'
                              )}
                            </td>
                            <td>{prossedParcel.area}</td>
                            <td>{prossedParcel.geoLocation.coordinates[0]}</td>
                            <td>{prossedParcel.geoLocation.coordinates[1]}</td>
                            <td>
                              {' '}
                              <Link
                                to={`/processed-parcel/edit/${prossedParcel.id}`}
                                className="btn btn-info"
                              >
                                Edit
                              </Link>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Create;
