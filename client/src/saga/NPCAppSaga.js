import { all, call, put, takeLatest } from 'redux-saga/effects';
import api from '../api.js';
import {
  NPCAPP_CREATE_POST_NPC,
  NPCAPP_CREATE_ADD_NPCLIST,
  NPCAPP_CREATE_COPY_NPC,
  NPCAPP_CREATE_SET_NPC,
  NPCAPP_CREATE_POST_NPCTEMPLATE,
  NPCAPP_CREATE_ADD_NPCTEMPLATE,
  NPCAPP_CREATE_SET_NPCTEMPLATE,
  NPCAPP_CREATE_COPY_NPCTEMPLATE
} from '../constants/actionTypes';


export const NPCAppSaga = [
  takeLatest(NPCAPP_CREATE_POST_NPC, postNPC),
  takeLatest(NPCAPP_CREATE_COPY_NPC, copyNPC),
  takeLatest(NPCAPP_CREATE_POST_NPCTEMPLATE, postNPCTemplate),
  takeLatest(NPCAPP_CREATE_COPY_NPCTEMPLATE, copyNPCTemplate)
];

function* postNPC(action) {
  const newNPC = yield call(api.npc.postNPC, action.values);
  yield all([
    put({ type: NPCAPP_CREATE_ADD_NPCLIST, newNPC }),
    put({ type: NPCAPP_CREATE_SET_NPC, npcID: newNPC.id })
  ]);
}

function* copyNPC(action) {
  const newNPC = yield call(api.npc.copyNPC, action.npcID);
  yield all([
    put({ type: NPCAPP_CREATE_ADD_NPCLIST, newNPC }),
    put({ type: NPCAPP_CREATE_SET_NPC, npcID: newNPC.id })
  ]);
}

function* postNPCTemplate(action) {
  const newNPCTemplate = yield call(api.npc.postNPCTemplate);
  yield all([
    put({ type: NPCAPP_CREATE_ADD_NPCTEMPLATE, npcTemplate: newNPCTemplate }),
    put({ type: NPCAPP_CREATE_SET_NPCTEMPLATE, templateID: newNPCTemplate.id })
  ]);
}

function* copyNPCTemplate(action) {
  const newNPC = yield call(api.npc.copyNPCTemplate, action.templateID);
  yield all([
    put({ type: NPCAPP_CREATE_ADD_NPCLIST, newNPC }),
    put({ type: NPCAPP_CREATE_SET_NPC, npcID: newNPC.id })
  ]);
}