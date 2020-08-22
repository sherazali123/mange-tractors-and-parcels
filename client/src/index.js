import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import React from 'react';
import ReactDOM from 'react-dom';
import * as dotenv from 'dotenv';
import {defaultTo} from 'lodash';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({path: '.env'});

const client = new ApolloClient({
  uri: defaultTo(process.env.GRAPHQL_URL, 'http://localhost:6001/graphql'),
  request: (operation) => {
    const authorization = localStorage.getItem('_idtoken');
    operation.setContext({
      headers: {
        authorization, //Your Auth token extraction logic
      },
    });
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
