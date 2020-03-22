import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { ThemeProvider } from 'styled-components';
import rootReducer from './reducers';

import App from './components/App';
import theme from './configs/theme';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

const initServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  const registration = await navigator.serviceWorker.register(
    './static/sw.js',
    {
      updateViaCache: 'none',
    },
  );

  let worker =
    registration.installing || registration.waiting || registration.active;

  navigator.serviceWorker.addEventListener(
    'controllerchange',
    () => (worker = navigator.serviceWorker.controller),
  );
};

initServiceWorker().catch(console.error);
