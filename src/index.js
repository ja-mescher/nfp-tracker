import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import rootReducer from './reducers'
import App from './App';

import './index.css';
import 'typeface-roboto'
import registerServiceWorker from './registerServiceWorker';

const store = createStore(rootReducer)
const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
