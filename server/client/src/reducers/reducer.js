import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import auth from './auth.js'
import global from './global.js'
import zoneApp from './zoneApp.js'

export default combineReducers({
  auth,
  global,
  zoneApp,
  form: formReducer
});