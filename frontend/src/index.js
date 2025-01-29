import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import 'jquery/dist/jquery.min.js';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import "font-awesome/css/font-awesome.min.css";
import'bootstrap-css-only/css/bootstrap.min.css'; 
import'mdbreact/dist/css/mdb.css';
import 'animate.css';

import reportWebVitals from './reportWebVitals';



const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 1000,
  offset: '80px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}
ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
    <App />
    </AlertProvider>
    
  </Provider>,
  document.getElementById('root')
);
reportWebVitals();
