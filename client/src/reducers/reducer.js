import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth.js';
import Global from './GlobalReducer.js';
import ZoneApp from './ZoneAppReducer.js';
import SpawnEditor from './SpawnEditorReducer.js';
import NPCEditor from './NPCEditorReducer.js';

export default combineReducers({
  auth,
  Global,
  ZoneApp,
  SpawnEditor,
  NPCEditor,
  form: formReducer
});