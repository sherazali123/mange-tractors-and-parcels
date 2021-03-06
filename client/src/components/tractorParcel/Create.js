import React, {Component} from 'react';
import moment from 'moment';

import {Query, Mutation} from 'react-apollo';
import {Link} from 'react-router-dom';
import {
  SAVE_TRACTOR_PARCEL,
  GET_TRACTORS_AND_PARCEL,
  GET_TRACTOR_PARCELS,
} from './../../graphql/tractorParcel';
import {ValidateForm, Constants} from '../ValidateForm';

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tractorId: '',
      parcelId: '',
      processOn: '',
      area: '',
      longitude: '',
      latitude: '',
      errors: {
        tractorId: Constants.TRACTOR_ID,
        parcelId: Constants.PARCEL_ID,
        processOn: Constants.PROCESS_ON,
        area: Constants.AREA,
        longitude: Constants.LONGTITUDE,
        latitude: Constants.LATITUDE,
      },
      errorMessage: '',
    };
  }

  handleChange(event) {
    event.preventDefault();

    const {name, value} = event.target;
    let errors = this.state.errors;

    this.setState({[event.target.name]: value});

    switch (name) {
      case 'tractorId':
        errors.tractorId = value.length < 1 ? Constants.TRACTOR_ID : '';
        break;
      case 'parcelId':
        errors.parcelId = value.length < 1 ? Constants.PARCEL_ID : '';
        break;
      case 'processOn':
        errors.processOn = value.length < 1 ? Constants.PROCESS_ON : '';
        break;
      case 'area':
        errors.area = value.length < 1 ? Constants.AREA : '';
        break;
      case 'longitude':
        errors.longitude = value.length < 1 ? Constants.LONGTITUDE : '';
        if (!errors.longitude) {
          if (isNaN(value)) {
            errors.longitude = Constants.INVALID_LONGTITUDE;
          }
        }
        break;
      case 'latitude':
        errors.latitude = value.length < 1 ? Constants.LATITUDE : '';
        if (!errors.latitude) {
          if (isNaN(value)) {
            errors.latitude = Constants.INVALID_LATITUDE;
          }
        }
        break;

      default:
        break;
    }
    this.setState({errors, [name]: value}, () => {
      console.log(errors);
    });
  }

  render() {
    return (
      <Query query={GET_TRACTORS_AND_PARCEL}>
        {({loading, error, data}) => {
          if (loading) return 'Loading...';
          if (error) {
            return <div className="container">Error! ${error.message}</div>;
          }
          const {tractors, parcels} = data.getActiveTractorsAndParcels;
          const {errors} = this.state;
          return (
            <Mutation
              mutation={SAVE_TRACTOR_PARCEL}
              refetchQueries={() => {
                return [
                  {
                    query: GET_TRACTOR_PARCELS,
                  },
                ];
              }}
              onCompleted={({saveTractorParcel}) => {
                const {error, errorMessage} = saveTractorParcel;
                if (error) {
                  if (errorMessage) {
                    this.setState({errorMessage});
                  } else {
                    if (error === 'OUT_OF_RANGE') {
                      this.setState({
                        errorMessage: 'This area is out of range!',
                      });
                    } else {
                      this.setState({errorMessage: error});
                    }
                  }
                } else {
                  this.props.history.push(`/processed-parcels`);
                }
              }}
            >
              {(saveTractorParcel, {loading, error}) => (
                <div className="container">
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h3 className="panel-title">
                        Process Parcel{' '}
                        <Link to="/processed-parcels" className="subLink">
                          Processed Parcels
                        </Link>
                      </h3>
                    </div>
                    <div className="panel-body">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (ValidateForm(this.state.errors)) {
                            saveTractorParcel({
                              variables: {
                                input: {
                                  tractorId: this.state.tractorId,
                                  parcelId: this.state.parcelId,
                                  processOn: this.state.processOn,
                                  area: this.state.area,
                                  longitude: parseFloat(this.state.longitude),
                                  latitude: parseFloat(this.state.latitude),
                                },
                              },
                            });
                          } else {
                            console.error('Invalid Form');
                          }
                        }}
                      >
                        <div className="form-group">
                          <label htmlFor="tractorId">Tractor:</label>
                          <select
                            className="form-control"
                            name="tractorId"
                            onChange={this.handleChange.bind(this)}
                          >
                            <option value="">Select Tractor</option>
                            {tractors.map(function (n) {
                              return (
                                <option key={n.name} value={n.id}>
                                  {n.name}
                                </option>
                              );
                            })}
                          </select>
                          {errors.tractorId.length > 0 && (
                            <span className="error">{errors.tractorId}</span>
                          )}
                        </div>

                        <div className="form-group">
                          <label htmlFor="parcelId">Parcel:</label>
                          <select
                            className="form-control"
                            name="parcelId"
                            onChange={this.handleChange.bind(this)}
                          >
                            <option value="">Select Parcel</option>
                            {parcels.map(function (n) {
                              return (
                                <option key={n.name} value={n.id}>
                                  {n.name}
                                </option>
                              );
                            })}
                          </select>
                          {errors.parcelId.length > 0 && (
                            <span className="error">{errors.parcelId}</span>
                          )}
                        </div>

                        <div className="form-group">
                          <label htmlFor="processOn">Process on:</label>
                          <input
                            type="date"
                            className="form-control"
                            name="processOn"
                            placeholder="Process on"
                            onChange={this.handleChange.bind(this)}
                          />
                          {errors.processOn.length > 0 && (
                            <span className="error">{errors.processOn}</span>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="area">Area:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="area"
                            placeholder="Area"
                            onChange={this.handleChange.bind(this)}
                          />
                          {errors.area.length > 0 && (
                            <span className="error">{errors.area}</span>
                          )}
                        </div>
                        <p className="info">
                          Allow only if it's in the range of 20km meters
                        </p>
                        <div className="form-group">
                          <label htmlFor="longitude">Longitude:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="longitude"
                            placeholder="Longitude"
                            onChange={this.handleChange.bind(this)}
                          />
                          {errors.longitude.length > 0 && (
                            <span className="error">{errors.longitude}</span>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="latitude">Latitude:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="latitude"
                            placeholder="Latitude"
                            onChange={this.handleChange.bind(this)}
                          />
                          {errors.latitude.length > 0 && (
                            <span className="error">{errors.latitude}</span>
                          )}
                        </div>
                        <button type="submit" className="btn btn-success">
                          Process
                        </button>
                      </form>
                      {loading && <p>Loading...</p>}
                      {error && <p>Error: Please try again</p>}
                      {this.state.errorMessage && (
                        <p className="error">{this.state.errorMessage}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default Create;
