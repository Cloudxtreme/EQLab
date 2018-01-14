import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import auth from './auth.js'
// import global from './global.js'
import ZoneApp from './ZoneAppReducer.js';
import SpawnEditor from './SpawnEditorReducer.js';
import NPCEditor from './NPCEditorReducer.js';

export default combineReducers({
  auth,
  ZoneApp,
  SpawnEditor,
  NPCEditor,
  form: formReducer
});