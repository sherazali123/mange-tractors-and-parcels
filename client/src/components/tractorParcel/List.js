import React, {Component} from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import './../../App.css';
import {Query} from 'react-apollo';
import {GET_TRACTOR_PARCELS} from '../../graphql/tractorParcel';

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tractorName: '',
      parcelName: '',
      culture: '',
      date: '',
    };
  }
  handleChange(event) {
    event.preventDefault();

    const {value} = event.target;

    this.setState({[event.target.name]: value});
    console.log('this', this.state);
  }

  render() {
    return (
      <div className="container">
        <hr />
        <div className="searchBar row">
          <div className="node col-md-3">
            <label htmlFor="tractorName">Tractor</label>
            <input
              type="text"
              className="form-control"
              name="tractorName"
              placeholder="Tractor Name"
              onChange={this.handleChange.bind(this)}
            />
          </div>
          <div className="node col-md-3">
            <label htmlFor="parcelName">Parcel</label>
            <input
              type="text"
              className="form-control"
              name="parcelName"
              placeholder="Parcel Name"
              onChange={this.handleChange.bind(this)}
            />
          </div>
          <div className="node col-md-3">
            <label htmlFor="culture">Culture</label>
            <input
              type="text"
              className="form-control"
              name="culture"
              placeholder="Culture"
              onChange={this.handleChange.bind(this)}
            />
          </div>
          <div className="node col-md-3">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              className="form-control"
              name="date"
              placeholder="Date"
              onChange={this.handleChange.bind(this)}
            />
          </div>
        </div>
        <hr />
        <Query
          query={GET_TRACTOR_PARCELS}
          fetchPolicy="no-cache"
          variables={{
            params: {
              tractorName: this.state.tractorName,
              parcelName: this.state.parcelName,
              culture: this.state.culture,
              date: this.state.date,
            },
          }}
        >
          {({loading, error, data}) => {
            if (loading) return 'Loading...';
            if (error) {
              return <div className="container">Error! ${error.message}</div>;
            }
            return (
              <div>
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
                          <th>Culture</th>
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
                              <td>{prossedParcel.parcel.culture}</td>
                              <td>
                                {moment(prossedParcel.processOn).format(
                                  'YYYY-MM-DD'
                                )}
                              </td>
                              <td>{prossedParcel.area}</td>
                              <td>
                                {prossedParcel.geoLocation.coordinates[0]}
                              </td>
                              <td>
                                {prossedParcel.geoLocation.coordinates[1]}
                              </td>
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
      </div>
    );
  }
}

export default Create;
