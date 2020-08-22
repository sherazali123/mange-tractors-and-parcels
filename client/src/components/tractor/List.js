import React, {Component} from 'react';

import {Link} from 'react-router-dom';
import './../../App.css';
import {Query} from 'react-apollo';
import {GET_TRACTORS} from './../../graphql/tractor';

class Create extends Component {
  render() {
    return (
      <Query query={GET_TRACTORS}>
        {({loading, error, data}) => {
          if (loading) return 'Loading...';
          if (error) {
            return <div className="container">Error! ${error.message}</div>;
          }
          return (
            <div className="container">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">
                    Tractors{' '}
                    <Link to="/tractor/create" className="subLink">
                      Add Tractor
                    </Link>
                  </h3>
                </div>
                <div className="panel-body">
                  <table className="table table-stripe">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.tractors.list.map((tractor, index) => (
                        <tr key={index}>
                          <td>{tractor.name}</td>
                          <td>{tractor.status}</td>
                          <td>
                            {' '}
                            <Link
                              to={`/tractor/edit/${tractor.id}`}
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
