import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './static/global';
import App from './App';
import store from './store';
import displayNotificationPage from './helpers/swNotifications';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });

    navigator.serviceWorker.controller.onstatechange = (e) => {
      if (e.target.state === 'redundant') {
        displayNotificationPage();
      }
    };
  });
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
