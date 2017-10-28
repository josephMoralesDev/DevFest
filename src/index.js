import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import 'font-awesome/css/font-awesome.min.css';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as reducers from './reducers';

const logger = createLogger();
const store = createStore(
  combineReducers({
    ...reducers,
  }),
  applyMiddleware(thunk, logger),
);

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>), document.getElementById('root'));
registerServiceWorker();
