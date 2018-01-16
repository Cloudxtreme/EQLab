import { all, call, put, takeLatest } from 'redux-saga/effects';
import api from '../api.js';
import {
  ZONEAPP_REBUILD_SPAWNTREE,
  NPCEDITOR_FETCH_NPC,
  NPCEDITOR_LOAD_NPC,
  NPCEDITOR_UNLOAD_NPC,
  NPCEDITOR_PUT_NPC,
  NPCEDITOR_UPDATE_NPC,
  NPCEDITOR_DELETE_NPC
} from '../constants/actionTypes';

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
  yield all([
    put({ type: NPCEDITOR_FETCH_NPC, npcID: action.npcID }),
    action.zone && put({ type: ZONEAPP_REBUILD_SPAWNTREE, zone: action.zone })
  ]);
}

function* deleteNPC(action) {
  yield call(api.npc.deleteNPC, action.npcID);
  yield all([
    put({ type: NPCEDITOR_UNLOAD_NPC }),
    action.zone && put({ type: ZONEAPP_REBUILD_SPAWNTREE, zone: action.zone })
  ]);
}