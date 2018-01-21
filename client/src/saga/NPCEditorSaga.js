import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import api from '../api.js';
import {
  ZONEAPP_SPAWNS_REBUILD_SPAWNTREE,
  NPCEDITOR_FETCH_NPC,
  NPCEDITOR_LOAD_NPC,
  NPCEDITOR_UNLOAD_NPC,
  NPCEDITOR_PUT_NPC,
  NPCEDITOR_UPDATE_NPC,
  NPCEDITOR_DELETE_NPC
} from '../constants/actionTypes.js';
import { 
  getZoneAppStatus,
  getCurrentZone,
} from './selectors.js';

export const NPCEditorSaga = [
  takeLatest(NPCEDITOR_FETCH_NPC, fetchNPC),
  takeLatest(NPCEDITOR_PUT_NPC, putNPC),
  takeLatest(NPCEDITOR_UPDATE_NPC, updateNPC),
  takeLatest(NPCEDITOR_DELETE_NPC, deleteNPC)
];

function* fetchNPC(action) {
  const npc = yield call(api.npc.getNPC, action.npcID);
  yield put({ type: NPCEDITOR_LOAD_NPC, payload: npc });
}

function* putNPC(action) {
  yield call(api.npc.putNPC, action.npcID, action.values);
  yield put({ type: NPCEDITOR_FETCH_NPC, npcID: action.npcID });
}

function* updateNPC(action) {
  let zone;
  const isZoneAppLoaded = yield select(getZoneAppStatus);
  isZoneAppLoaded ? zone = yield select(getCurrentZone) : zone = null;
  yield all([
    put({ type: NPCEDITOR_FETCH_NPC, npcID: action.npcID }),
    isZoneAppLoaded && put({ type: ZONEAPP_SPAWNS_REBUILD_SPAWNTREE, zone })
  ]);
}

function* deleteNPC(action) {
  let zone;
  const isZoneAppLoaded = yield select(getZoneAppStatus);
  isZoneAppLoaded ? zone = yield select(getCurrentZone) : zone = null;
  yield call(api.npc.deleteNPC, action.npcID);
  yield all([
    put({ type: NPCEDITOR_UNLOAD_NPC }),
    isZoneAppLoaded && put({ type: ZONEAPP_SPAWNS_REBUILD_SPAWNTREE, zone })
  ]);
}