import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js';
import 'popper.js';
import './css/font/font-awesome-4.7.0/css/font-awesome.min.css';
import './css/font/iconic/css/material-design-iconic-font.min.css';
import './css/vendor/animate/animate.css';
import './css/util.css';
import './css/main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/style.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
