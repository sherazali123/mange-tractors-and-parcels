import React, {Component} from 'react';

import {Query, Mutation} from 'react-apollo';
import {LOGIN, GET_USER} from './../graphql/user';
import {GET_ENUMS} from './../graphql/enums';
import {ValidateForm, Constants} from './ValidateForm';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {
        email: '',
        password: '',
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
      case 'email':
        errors.email = value.length < 1 ? Constants.EMAIL : '';
        break;
      case 'password':
        errors.password = value.length < 1 ? Constants.PASSWORD : '';
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
        query={GET_USER}
        variables={{token: localStorage.getItem('_idtoken')}}
        onCompleted={({admin}) => {
          if (admin) {
            this.props.history.push(`/dashboard`);
          }
        }}
      >
        {({loading, error, data}) => {
          if (loading) return 'Loading...';
          if (error) {
            return <div className="container">Error! ${error.message}</div>;
          }
          const {errors} = this.state;
          return (
            <Mutation
              mutation={LOGIN}
              // refetchQueries={() => {
              //   return [
              //     {
              //       query: GET_TRACTORS,
              //     },
              //   ];
              // }}
              onCompleted={({login}) => {
                const {error, errorMessage} = login;
                if (error) {
                  if (errorMessage) {
                    this.setState({errorMessage});
                  } else {
                    if (error === 'INVALID_CREDENTIALS') {
                      this.setState({
                        errorMessage: 'Please enter valid credentials!',
                      });
                    } else {
                      this.setState({errorMessage: error});
                    }
                  }
                } else {
                  localStorage.setItem('_idtoken', login.token);
                  localStorage.setItem('email', login.data.admin.email);
                  this.props.history.push(`/dashboard`);
                }
              }}
            >
              {(login, {loading, error}) => (
                <div className="container">
                  <div className="panel panel-default">
                    <div className="panel-body loginForm">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (ValidateForm(this.state.errors)) {
                            login({
                              variables: {
                                input: {
                                  email: this.state.email,
                                  password: this.state.password,
                                },
                              },
                            });
                          } else {
                            console.error('Invalid Form');
                          }
                        }}
                      >
                        <div className="form-group">
                          <label htmlFor="email">Email:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="email"
                            placeholder="Email"
                            onChange={this.handleChange.bind(this)}
                          />
                          {errors.email.length > 0 && (
                            <span className="error">{errors.email}</span>
                          )}
                        </div>

                        <div className="form-group">
                          <label htmlFor="email">Password:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="password"
                            placeholder="Password"
                            onChange={this.handleChange.bind(this)}
                          />
                          {errors.password.length > 0 && (
                            <span className="error">{errors.password}</span>
                          )}
                        </div>

                        <button type="submit" className="btn btn-success">
                          Login
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

export default Login;
