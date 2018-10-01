import './index.css';

import { MuiThemeProvider, } from '@material-ui/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store';
import { fetch_data } from './actions/vjudge';
import { theme } from './constants/theme';

const store = configureStore();
// @ts-ignore
const update = () => store.dispatch(fetch_data());
update(); setInterval(update, 5 * 60 * 1000); // update now and every 5 minutes
ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
