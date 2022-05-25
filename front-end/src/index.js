import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { configureStore} from "@reduxjs/toolkit";
import rootReducer from "./store/reducers/rootReducer";
import { Provider } from 'react-redux';

const store = configureStore({
  reducer: rootReducer,
})

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
reportWebVitals();
