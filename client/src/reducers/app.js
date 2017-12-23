import {
  APP_LOAD
} from '../constants/actionTypes';


const defaultState = {
  appName: 'EQLab',
  token: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
      };
    case REDIRECT:
      return { ...state, redirectTo: null };
    case LOGOUT:
      return { ...state, redirectTo: '/', token: null };
    default:
      return state;
  }
}