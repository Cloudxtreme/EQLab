import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import api from '../api.js';
import {
  ZONEAPP_SPAWNS_REBUILD_SPAWNTREE,
  NPCAPP_SEARCH_REFRESH_NPCLIST,
  NPCAPP_SEARCH_FILTER_NPCLIST,
  NPCAPP_CREATE_REFRESH_NPCLIST,
  NPCAPP_CREATE_FILTER_NPCLIST,
  NPCAPP_CREATE_REFRESH_NPCTEMPLATE_LIST,
  NPCAPP_CREATE_FILTER_NPCTEMPLATE_LIST,
  NPCEDITOR_GET_NPC,
  NPCEDITOR_GET_NPCTEMPLATE,
  NPCEDITOR_LOAD_NPC,
  NPCEDITOR_UNLOAD_NPC,
  NPCEDITOR_PATCH_NPC,
  NPCEDITOR_PATCH_NPCTEMPLATE,
  NPCEDITOR_UPDATE_NPC,
  NPCEDITOR_UPDATE_NPCTEMPLATE,
  NPCEDITOR_DELETE_NPC,
  NPCEDITOR_DELETE_NPCTEMPLATE
} from '../constants/actionTypes.js';
import { 
  getZoneAppStatus,
  getCurrentZone,
  getNPCAppStatus
} from './selectors.js';


function* manageSubApps(action, data) {
  const ZoneAppLoaded = yield select(getZoneAppStatus);
  const NPCAppLoaded = yield select(getNPCAppStatus);
  
  if (ZoneAppLoaded) {
    const zone = yield select(getCurrentZone);
    yield put({ type: ZONEAPP_SPAWNS_REBUILD_SPAWNTREE, zone });
  }

  if (NPCAppLoaded) {
    switch(action) {
      case "update-npc":
        yield all([
          put({ type: NPCAPP_SEARCH_REFRESH_NPCLIST, npc: data.type }),
          put({ type: NPCAPP_CREATE_REFRESH_NPCLIST, npc: data.type })
        ]);
        break;
      case "update-template":
        yield put({ type: NPCAPP_CREATE_REFRESH_NPCTEMPLATE_LIST, template: data.type });
        break;
      case "delete-npc":
        yield all([
          put({ type: NPCAPP_SEARCH_FILTER_NPCLIST, npcID: data }),
          put({ type: NPCAPP_CREATE_FILTER_NPCLIST, npcID: data })
        ]);
        break;
      case "delete-template":
        yield put({ type: NPCAPP_CREATE_FILTER_NPCTEMPLATE_LIST, templateID: data })
        break;
      default:
        break;
    }
  }
}

export const NPCEditorSaga = [
  takeLatest(NPCEDITOR_GET_NPC, getNPC),
  takeLatest(NPCEDITOR_GET_NPCTEMPLATE, getNPCTemplate),
  takeLatest(NPCEDITOR_PATCH_NPC, patchNPC),
  takeLatest(NPCEDITOR_PATCH_NPCTEMPLATE, patchNPCTemplate),
  takeLatest(NPCEDITOR_UPDATE_NPC, updateNPC),
  takeLatest(NPCEDITOR_UPDATE_NPCTEMPLATE, updateNPCTemplate),
  takeLatest(NPCEDITOR_DELETE_NPC, deleteNPC),
  takeLatest(NPCEDITOR_DELETE_NPCTEMPLATE, deleteNPCTemplate)
];

function* getNPC(action) {
  const npc = yield call(api.npc.getNPC, action.npcID);
  yield all([
    put({ type: NPCEDITOR_LOAD_NPC, isTemplate: false, payload: npc }),
    call(manageSubApps, action.subAppAction, npc)
  ]);
}

function* getNPCTemplate(action) {
  const template = yield call(api.npc.getNPCTemplate, action.templateID);
  yield all([
    put({ type: NPCEDITOR_LOAD_NPC, isTemplate: true, payload: template }),
    call(manageSubApps, action.subAppAction, template)
  ]);
}

function* patchNPC(action) {
  yield call(api.npc.patchNPC, action.npcID, action.values);
  yield put({ type: NPCEDITOR_GET_NPC, npcID: action.npcID, subAppAction: "update-npc" });
}

function* patchNPCTemplate(action) {
  yield call(api.npc.patchNPCTemplate, action.templateID, action.values);
  yield put({ type: NPCEDITOR_GET_NPCTEMPLATE, templateID: action.templateID, subAppAction: "update-template" });
}

function* updateNPC(action) {
  yield put({ type: NPCEDITOR_GET_NPC, npcID: action.npcID, subAppAction: "update-npc" });
}

function* updateNPCTemplate(action) {
  yield put({ type: NPCEDITOR_GET_NPCTEMPLATE, templateID: action.templateID, subAppAction: "update-template" });
}

function* deleteNPC(action) {
  yield call(api.npc.deleteNPC, action.npcID);
  yield all([
    put({ type: NPCEDITOR_UNLOAD_NPC }),
    call(manageSubApps, "delete-npc", action.npcID)
  ]);
}

function* deleteNPCTemplate(action) {
  yield call(api.npc.deleteNPCTemplate, action.templateID);
  yield all([
    put({ type: NPCEDITOR_UNLOAD_NPC }),
    call(manageSubApps, "delete-template", action.templateID)
  ]);
}