import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth.js';
import EQLab from './EQLabReducer.js';
import ZoneApp from './ZoneAppReducer.js';
import NPCApp from './NPCAppReducer.js';
import SpawnEditor from './SpawnEditorReducer.js';
import NPCEditor from './NPCEditorReducer.js';

export default combineReducers({
  auth,
  EQLab,
  ZoneApp,
  NPCApp,
  SpawnEditor,
  NPCEditor,
  form: formReducer
});