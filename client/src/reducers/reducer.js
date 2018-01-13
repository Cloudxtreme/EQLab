import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import auth from './auth.js'
import global from './global.js'
import ZoneApp from './ZoneAppReducer.js';
import SpawnEditor from './SpawnEditorReducer.js';

export default combineReducers({
  auth,
  global,
  ZoneApp,
  SpawnEditor,
  form: formReducer
});