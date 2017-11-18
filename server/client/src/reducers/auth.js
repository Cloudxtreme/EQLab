import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_REGISTER
} from '../constants/actionTypes';


export default (state = {}, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
    case AUTH_REGISTER:
      return {
        ...state,
      }
    case AUTH_LOGOUT:
      return {}
    default:
      return state;
  }
}