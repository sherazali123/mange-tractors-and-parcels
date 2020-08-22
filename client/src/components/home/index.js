import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './../../App.css';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="panel-body">
          <Link to={`/tractors`}>Tractors</Link>
          <Link to={`/parcels`}>Parcels</Link>
        </div>
      </div>
    );
  }
}

export default Home;
