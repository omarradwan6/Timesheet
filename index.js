import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, BrowserHistory } from 'react-router-dom'
import { Provider } from "react-redux";
import { createStore,applyMiddleware, compose } from "redux";
import reducers from "./reducers";
import history from './history'


//const store = createStore(reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducers, composeEnhancers())

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter history={history}>
        <App />
     </BrowserRouter>
   </Provider>


    , document.getElementById('root'));