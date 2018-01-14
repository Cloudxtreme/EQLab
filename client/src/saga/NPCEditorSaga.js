import { all, call, put, takeLatest } from 'redux-saga/effects';
import api from '../api.js';
import {
  // ZONEAPP_FETCH_SPAWN2TREE,
  NPCEDITOR_FETCH_NPC,
  NPCEDITOR_LOAD_NPC,
  // NPCEDITOR_UNLOAD_NPC,
  NPCEDITOR_UPDATE_NPC
} from '../constants/actionTypes';

export const NPCEditorSaga = [
  takeLatest(NPCEDITOR_FETCH_NPC, fetchNPC),
  takeLatest(NPCEDITOR_UPDATE_NPC, updateNPC)
];

function* fetchNPC(action) {
  const npc = yield call(api.npc.getNPCData, action.npcID);
  yield put({ type: NPCEDITOR_LOAD_NPC, payload: npc });
}

function* updateNPC(action) {
  yield all([
    put({ type: NPCEDITOR_FETCH_NPC, npcID: action.npcID })
    // action.zone && put({ type: ZONEAPP_FETCH_SPAWN2TREE, spawn2ID: action.spawn2ID })
  ]);
}