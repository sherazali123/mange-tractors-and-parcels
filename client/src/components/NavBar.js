import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NavBar extends Component {
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
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;
