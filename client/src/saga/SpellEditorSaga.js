import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import api from '../api.js';
import {
  SPELLAPP_SEARCH_REFRESH_SPELLLIST,
  SPELLAPP_SEARCH_FILTER_SPELLLIST,
  SPELLEDITOR_GET_SPELL,
  SPELLEDITOR_GET_SPELLTEMPLATE,
  SPELLEDITOR_LOAD_SPELL,
  SPELLEDITOR_UNLOAD_SPELL,
  SPELLEDITOR_PUT_SPELL,
  SPELLEDITOR_PUT_SPELLTEMPLATE,
  SPELLEDITOR_UPDATE_SPELL,
  SPELLEDITOR_UPDATE_SPELLTEMPLATE,
  SPELLEDITOR_DELETE_SPELL,
  SPELLEDITOR_DELETE_SPELLTEMPLATE
} from '../constants/actionTypes.js';
import { 
  getSpellAppStatus
} from './selectors.js';


function* manageSubApps(action, data) {
  const SpellAppLoaded = yield select(getSpellAppStatus);
  
  if (SpellAppLoaded) {
    switch(action) {
      case "update-spell":
        yield all([
          put({ type: SPELLAPP_SEARCH_REFRESH_SPELLLIST, spell: data })
          // put({ type: NPCAPP_CREATE_REFRESH_NPCLIST, npc: data.type })
        ]);
        break;
      // case "update-template":
      //   yield put({ type: NPCAPP_CREATE_REFRESH_NPCTEMPLATE_LIST, template: data.type });
      //   break;
      case "delete-spell":
        yield all([
          put({ type: SPELLAPP_SEARCH_FILTER_SPELLLIST, spellID: data })
          // put({ type: NPCAPP_CREATE_FILTER_NPCLIST, npcID: data })
        ]);
        break;
      // case "delete-template":
      //   yield put({ type: NPCAPP_CREATE_FILTER_NPCTEMPLATE_LIST, templateID: data })
      //   break;
      default:
        break;
    }
  }
}

export const SpellEditorSaga = [
  takeLatest(SPELLEDITOR_GET_SPELL, getSpell),
  takeLatest(SPELLEDITOR_GET_SPELLTEMPLATE, getSpellTemplate),
  takeLatest(SPELLEDITOR_PUT_SPELL, putSpell),
  takeLatest(SPELLEDITOR_PUT_SPELLTEMPLATE, putSpellTemplate),
  takeLatest(SPELLEDITOR_UPDATE_SPELL, updateSpell),
  takeLatest(SPELLEDITOR_UPDATE_SPELLTEMPLATE, updateSpellTemplate),
  takeLatest(SPELLEDITOR_DELETE_SPELL, deleteSpell),
  takeLatest(SPELLEDITOR_DELETE_SPELLTEMPLATE, deleteSpellTemplate)
];

function* getSpell(action) {
  const spell = yield call(api.spell.getSpell, action.spellID);
  yield all([
    put({ type: SPELLEDITOR_LOAD_SPELL, isTemplate: false, payload: spell }),
    call(manageSubApps, action.subAppAction, spell)
  ]);
}

function* getSpellTemplate(action) {
  const template = yield call(api.spell.getSpellTemplate, action.templateID);
  yield all([
    put({ type: SPELLEDITOR_LOAD_SPELL, isTemplate: true, payload: template }),
    call(manageSubApps, action.subAppAction, template)
  ]);
}

function* putSpell(action) {
  yield call(api.spell.putSpell, action.spellID, action.values);
  yield put({ type: SPELLEDITOR_GET_SPELL, spellID: action.spellID, subAppAction: "update-spell" });
}

function* putSpellTemplate(action) {
  yield call(api.spell.putSpellTemplate, action.templateID, action.values);
  yield put({ type: SPELLEDITOR_GET_SPELLTEMPLATE, templateID: action.templateID, subAppAction: "update-template" });
}

function* updateSpell(action) {
  yield put({ type: SPELLEDITOR_GET_SPELL, spellID: action.spellID, subAppAction: "update-spell" });
}

function* updateSpellTemplate(action) {
  yield put({ type: SPELLEDITOR_GET_SPELLTEMPLATE, templateID: action.templateID, subAppAction: "update-template" });
}

function* deleteSpell(action) {
  yield call(api.spell.deleteSpell, action.spellID);
  yield all([
    put({ type: SPELLEDITOR_UNLOAD_SPELL }),
    call(manageSubApps, "delete-spell", action.spellID)
  ]);
}

function* deleteSpellTemplate(action) {
  yield call(api.spell.deleteSpellTemplate, action.templateID);
  yield all([
    put({ type: SPELLEDITOR_UNLOAD_SPELL }),
    call(manageSubApps, "delete-template", action.templateID)
  ]);
}