import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NavBar extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  logout() {
    localStorage.setItem('_idtoken', '');
    localStorage.setItem('email', '');
    window.location.href = '/';
  }
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-to container">
          <Link to={`/`} className="navbar-brand">
            Dashboard
          </Link>
          <Link to={`/tractors`} className="navbar-brand">
            Tractors
          </Link>
          <Link to={`/parcels`} className="navbar-brand">
            Parcels
          </Link>
          <Link to={`/processed-parcels`} className="navbar-brand">
            Processed Parcels
          </Link>
          <Link onClick={this.logout.bind(this)} to="" className="navbar-brand">
            Login/Logout {localStorage.getItem('email')}
          </Link>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;
