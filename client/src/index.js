import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';
import './css/bootstrap.css'; // Custom Bootstrap
import './css/bootstrap-theme.css'; // Custom Bootstrap Theme
import 'react-select/dist/react-select.css';
import 'font-awesome/css/font-awesome.min.css';
import './css/custom.css'; // Custom CSS
import EQLab from './_EQLab/EQLab.jsx';

const socket = io.connect();

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter basename="/eqlab">
      <SocketProvider socket={socket}>
        <EQLab />
      </SocketProvider>
    </BrowserRouter>
  </Provider>
), document.getElementById('index'));

registerServiceWorker();