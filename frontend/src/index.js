import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import reducer from './store/rootReducer';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from './AppTheme';
import './App.css';

const store = configureStore({
  reducer,
  middleware: [thunk],
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
