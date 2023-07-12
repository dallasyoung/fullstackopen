import React from "react";
import ReactDOM from "react-dom/client";

import App from './App';

// Didn't notice until now that this code from the model answers was quite out
// of date, and trying to update this caused all sorts of headaches with out of
// date React requirements, dependency conflicts, etc. Was eventually able to
// get this sorted by updating from React 17 -> 18, deleting the package lock &
// ./node_modules, and re-installing all required packages
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);