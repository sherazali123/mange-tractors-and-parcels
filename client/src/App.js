import React from 'react';
import './App.css';

import {BrowserRouter as Router, Route} from 'react-router-dom';

// Components
import NavBar from './components/NavBar';
import Home from './components/home/index';
import TractorList from './components/tractor/List';
import TractorEdit from './components/tractor/Edit';
import TractorCreate from './components/tractor/Create';
import ParcelList from './components/parcel/List';
import ParcelEdit from './components/parcel/Edit';
import ParcelCreate from './components/parcel/Create';
import TractorParcelList from './components/tractorParcel/List';
import TractorParcelEdit from './components/tractorParcel/Edit';
import TractorParcelCreate from './components/tractorParcel/Create';

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route path="/tractors" component={TractorList} />
        <Route path="/tractor/edit/:id" component={TractorEdit} />
        <Route path="/tractor/create" component={TractorCreate} />

        <Route path="/parcels" component={ParcelList} />
        <Route path="/parcel/edit/:id" component={ParcelEdit} />
        <Route path="/parcel/create" component={ParcelCreate} />

        <Route path="/processed-parcels" component={TractorParcelList} />
        <Route
          path="/processed-parcel/edit/:id"
          component={TractorParcelEdit}
        />
        <Route
          path="/processed-parcel/create"
          component={TractorParcelCreate}
        />
      </Router>
    </div>
  );
}

export default App;
