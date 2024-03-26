import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from 'react-dom/client'

import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store'; // Import your Redux store
import App from './App';
import reportWebVitals from './reportWebVitals';

// Use createRoot instead of ReactDOM.render
const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
