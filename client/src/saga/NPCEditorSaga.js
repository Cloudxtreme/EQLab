import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../api.js';
import { 
  GLOBAL_LOAD_NPC,
  // GLOBAL_UNLOAD_NPC,
  NPCEDITOR_UPDATE_NPC
} from '../constants/actionTypes';

export const NPCEditorSaga = [
  takeLatest(NPCEDITOR_UPDATE_NPC, updateNPC)
];

function* refreshNPCData(npcID) {
  const npc = yield call(api.npc.getNPCData, npcID);
  yield put({ type: GLOBAL_LOAD_NPC, payload: npc });
}

function* updateNPC(action) {
  yield call(api.npc.putNPC, action.npcID, action.values);
  yield call(refreshNPCData, action.npcID);
}