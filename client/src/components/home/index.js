import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './../../App.css';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="panel-body">
          <div className="card defaultTopPadding">
            <div className="card-body">
              <h5 className="card-title">Tractors</h5>

              <Link to={`/tractors`} lassName="card-link">
                Tractors
              </Link>
            </div>
          </div>
          <hr />
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Parcels</h5>

              <Link to={`/parcels`} lassName="card-link">
                Parcels
              </Link>
            </div>
          </div>
          <hr />
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Reports</h5>

              <Link to={`/processed-parcels`} lassName="card-link">
                Reports
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
