import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth.js';
import EQLab from './EQLabReducer.js';
import ZoneApp from './ZoneAppReducer.js';
import NPCApp from './NPCAppReducer.js';
import SpellApp from './SpellAppReducer.js';
import SpawnEditor from './SpawnEditorReducer.js';
import NPCEditor from './NPCEditorReducer.js';
import SpellEditor from './SpellEditorReducer.js';


export default combineReducers({
  auth,
  EQLab,
  ZoneApp,
  NPCApp,
  SpellApp,
  SpawnEditor,
  NPCEditor,
  SpellEditor,
  form: formReducer
});