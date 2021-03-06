import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Query, Mutation} from 'react-apollo';
import {GET_TRACTOR, SAVE_TRACTOR, GET_TRACTORS} from './../../graphql/tractor';
import {ValidateForm, Constants} from '../ValidateForm';

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      name: '',
      status: '',
      errors: {
        name: '',
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
        query={GET_TRACTOR}
        variables={{tractorId: this.props.match.params.id}}
        onCompleted={(data) =>
          this.setState({
            id: data.tractor.id,
            name: data.tractor.name,
            status: data.tractor.status,
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
              mutation={SAVE_TRACTOR}
              refetchQueries={() => {
                return [
                  {
                    query: GET_TRACTORS,
                  },
                ];
              }}
              key={data.tractor.id}
              onCompleted={({saveTractor}) => {
                const {error, errorMessage} = saveTractor;
                if (error) {
                  if (errorMessage) {
                    this.setState({errorMessage});
                  } else {
                    this.setState({errorMessage: error});
                  }
                } else {
                  this.props.history.push(`/tractors`);
                }
              }}
            >
              {(saveTractor, {loading, error}) => (
                <div className="container">
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h3 className="panel-title">
                        Edit Tractor{' '}
                        <Link to="/tractors" className="subLink">
                          Tractors
                        </Link>
                      </h3>
                    </div>
                    <div className="panel-body">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (ValidateForm(this.state.errors)) {
                            saveTractor({
                              variables: {
                                input: {
                                  id: data.tractor.id,
                                  name: this.state.name,
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
                            defaultValue={data.tractor.name}
                            onChange={this.handleChange.bind(this)}
                          />
                          {errors.name.length > 0 && (
                            <span className="error">{errors.name}</span>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="status">Status:</label>
                          <select
                            className="form-control"
                            name="status"
                            defaultValue={data.tractor.status}
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
