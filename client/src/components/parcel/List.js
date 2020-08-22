import React, {Component} from 'react';

import {Link} from 'react-router-dom';
import './../../App.css';
import {Query} from 'react-apollo';
import {GET_PARCELS} from '../../graphql/parcel';

class Create extends Component {
  render() {
    return (
      <Query query={GET_PARCELS}>
        {({loading, error, data}) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          return (
            <div className="container">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">
                    Parcels{' '}
                    <Link to="/parcel/create" className="subLink">
                      Add Parcel
                    </Link>
                  </h3>
                </div>
                <div className="panel-body">
                  <table className="table table-stripe">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Culture</th>
                        <th>Area</th>
                        <th>Longitude</th>
                        <th>Latitude</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.parcels.list.map((parcel, index) => (
                        <tr key={index}>
                          <td>{parcel.name}</td>
                          <td>{parcel.culture}</td>
                          <td>{parcel.area}</td>
                          <td>{parcel.geoLocation.coordinates[0]}</td>
                          <td>{parcel.geoLocation.coordinates[1]}</td>
                          <td>{parcel.status}</td>
                          <td>
                            {' '}
                            <Link
                              to={`/parcel/edit/${parcel.id}`}
                              className="btn btn-info"
                            >
                              Edit
                            </Link>
                          </td>
                        </tr>
                      ))}
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
