import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

// core styles
import "./volt_scss/volt.scss";

// vendor styles
// import "react-datetime/css/react-datetime.css";

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

