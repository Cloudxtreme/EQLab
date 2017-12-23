import api from './api';
import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_REGISTER
} from './constants/actionTypes';


const localStorageMiddleware = store => next => action => {
  if (action.type === AUTH_REGISTER || action.type === AUTH_LOGIN) {
    if (!action.error) {
      window.localStorage.setItem('jwt', action.payload.token);
      api.setToken(action.payload.token);
    }
  } else if (action.type === AUTH_LOGOUT) {
    window.localStorage.setItem('jwt', '');
    api.setToken(null);
  }

  next(action);
};


export default localStorageMiddleware;