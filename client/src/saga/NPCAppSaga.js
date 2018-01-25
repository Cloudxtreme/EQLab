import { all, call, put, takeLatest } from 'redux-saga/effects';
import api from '../api.js';
import {
  NPCAPP_CREATE_POST_NPC,
  NPCAPP_CREATE_COPY_NPC,
  NPCAPP_CREATE_SET_NPC,
  NPCAPP_CREATE_POST_NPCTEMPLATE,
  NPCAPP_CREATE_COPY_NPCTEMPLATE
} from '../constants/actionTypes';


export const NPCAppSaga = [
  takeLatest(NPCAPP_CREATE_POST_NPC, postNPC),
  takeLatest(NPCAPP_CREATE_COPY_NPC, copyNPC),
  takeLatest(NPCAPP_CREATE_POST_NPCTEMPLATE, postNPCTemplate),
  takeLatest(NPCAPP_CREATE_COPY_NPCTEMPLATE, copyNPCTemplate)
];

function* postNPC(action) {
  const newNPCID = yield call(api.npc.postNPC, action.values);
  yield put({ type: NPCAPP_CREATE_SET_NPC, npcID: newNPCID });
}

function* copyNPC(action) {
  const newNPCID = yield call(api.npc.copyNPC, action.npcID);
  yield put({ type: NPCAPP_CREATE_SET_NPC, npcID: newNPCID });
}

function* postNPCTemplate(action) {
  const newNPCTemplateID = yield call(api.npc.postNPCTemplate, action.values);
  // yield put({ type: NPCAPP_CREATE_SET_NPC, npcID: newNPCTemplateID });
}

function* copyNPCTemplate(action) {
  const newNPCID = yield call(api.npc.copyNPCTemplate, action.templateID);
  yield put({ type: NPCAPP_CREATE_SET_NPC, npcID: newNPCID });
}