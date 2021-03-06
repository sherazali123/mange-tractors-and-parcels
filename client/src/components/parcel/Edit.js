import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Query, Mutation} from 'react-apollo';
import {GET_PARCEL, SAVE_PARCEL, GET_PARCELS} from './../../graphql/parcel';
import {ValidateForm, Constants} from '../ValidateForm';

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      name: '',
      area: '',
      culture: '',
      longitude: '',
      latitude: '',
      status: '',
      errors: {
        name: '',
        area: '',
        culture: '',
        longitude: '',
        latitude: '',
        status: '',
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
      case 'name':
        errors.name = value.length < 1 ? Constants.NAME : '';
        break;
      case 'area':
        errors.area = value.length < 1 ? Constants.AREA : '';
        break;
      case 'culture':
        errors.culture = value.length < 1 ? Constants.CULTURE : '';
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
      case 'status':
        errors.status = value.length < 1 ? Constants.STATUS : '';
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
      <Query
        query={GET_PARCEL}
        variables={{parcelId: this.props.match.params.id}}
        onCompleted={(data) =>
          this.setState({
            id: data.parcel.id,
            name: data.parcel.name,
            area: data.parcel.area,
            culture: data.parcel.culture,
            longitude: data.parcel.geoLocation.coordinates[0],
            latitude: data.parcel.geoLocation.coordinates[1],
            status: data.parcel.status,
          })
        }
      >
        {({loading, error, data}) => {
          if (loading) return 'Loading...';
          if (error) {
            return <div className="container">Error! ${error.message}</div>;
          }
          const {enumValues: statues} = data.__type;
          const {errors} = this.state;
          return (
            <Mutation
              mutation={SAVE_PARCEL}
              refetchQueries={() => {
                return [
                  {
                    query: GET_PARCELS,
                  },
                ];
              }}
              key={data.parcel.id}
              onCompleted={({saveParcel}) => {
                const {error, errorMessage} = saveParcel;
                if (error) {
                  if (errorMessage) {
                    this.setState({errorMessage});
                  } else {
                    this.setState({errorMessage: error});
                  }
                } else {
                  this.props.history.push(`/parcels`);
                }
              }}
            >
              {(saveParcel, {loading, error}) => (
                <div className="container">
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h3 className="panel-title">
                        Edit Parcel{' '}
                        <Link to="/parcels" className="subLink">
                          Parcels
                        </Link>
                      </h3>
                    </div>
                    <div className="panel-body">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (ValidateForm(this.state.errors)) {
                            saveParcel({
                              variables: {
                                input: {
                                  id: data.parcel.id,
                                  name: this.state.name,
                                  area: this.state.area,
                                  culture: this.state.culture,
                                  longitude: parseFloat(this.state.longitude),
                                  latitude: parseFloat(this.state.latitude),
                                  status: this.state.status,
                                },
                              },
                            });
                          } else {
                            console.error('Invalid Form');
                          }
                        }}
                      >
                        <div className="form-group">
                          <label htmlFor="name">Name:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Name"
                            defaultValue={data.parcel.name}
                            onChange={this.handleChange.bind(this)}
                          />
                          {errors.name.length > 0 && (
                            <span className="error">{errors.name}</span>
                          )}
                        </div>

                        <div className="form-group">
                          <label htmlFor="culture">Culture:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="culture"
                            placeholder="Culture"
                            defaultValue={data.parcel.culture}
                            onChange={this.handleChange.bind(this)}
                          />
                          {errors.culture.length > 0 && (
                            <span className="error">{errors.culture}</span>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="area">Area:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="area"
                            placeholder="Area"
                            defaultValue={data.parcel.area}
                            onChange={this.handleChange.bind(this)}
                          />
                          {errors.area.length > 0 && (
                            <span className="error">{errors.area}</span>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="longitude">Longitude:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="longitude"
                            placeholder="Longitude"
                            defaultValue={
                              data.parcel.geoLocation.coordinates[0]
                            }
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
                            defaultValue={
                              data.parcel.geoLocation.coordinates[1]
                            }
                            onChange={this.handleChange.bind(this)}
                          />
                          {errors.latitude.length > 0 && (
                            <span className="error">{errors.latitude}</span>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="status">Status:</label>
                          <select
                            className="form-control"
                            name="status"
                            defaultValue={data.parcel.status}
                            onChange={this.handleChange.bind(this)}
                          >
                            {statues.map(function (n) {
                              return (
                                <option key={n.name} value={n.name}>
                                  {n.name}
                                </option>
                              );
                            })}
                          </select>
                          {errors.status.length > 0 && (
                            <span className="error">{errors.status}</span>
                          )}
                        </div>

                        <button type="submit" className="btn btn-success">
                          Save
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

export default Edit;
