import { all, call, put, takeLatest } from 'redux-saga/effects';
import api from '../api.js';
import {
  NPCEDITOR_FETCH_NPC,
  NPCEDITOR_LOAD_NPC,
  // NPCEDITOR_UNLOAD_NPC,
  NPCEDITOR_PUT_NPC
} from '../constants/actionTypes';

export const NPCEditorSaga = [
  takeLatest(NPCEDITOR_FETCH_NPC, fetchNPC),
  takeLatest(NPCEDITOR_PUT_NPC, putNPC)
];

function* fetchNPC(action) {
  const npc = yield call(api.npc.getNPCData, action.npcID);
  yield put({ type: NPCEDITOR_LOAD_NPC, payload: npc });
}

function* putNPC(action) {
  yield call(api.npc.putNPC, action.npcID, action.values);
  yield all([
    put({ type: NPCEDITOR_FETCH_NPC, npcID: action.npcID })
  ]);
}