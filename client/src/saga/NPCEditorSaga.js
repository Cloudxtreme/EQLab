import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import api from '../api.js';
import {
  ZONEAPP_SPAWNS_REBUILD_SPAWNTREE,
  NPCAPP_SEARCH_REFRESH_NPCLIST,
  NPCAPP_SEARCH_FILTER_NPCLIST,
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
  getNPCAppStatus,
  getCurrentNPCID
} from './selectors.js';


function* manageSubApps(action) {
  const ZoneAppLoaded = yield select(getZoneAppStatus);
  const NPCAppLoaded = yield select(getNPCAppStatus);
  
  if (ZoneAppLoaded) {
    const zone = yield select(getCurrentZone);
    yield put({ type: ZONEAPP_SPAWNS_REBUILD_SPAWNTREE, zone });
  }

  if (NPCAppLoaded) {
    const npcID = yield select(getCurrentNPCID);

    switch(action) {
      case "update":
        const npc = yield call(api.npc.getNPC, npcID);
        yield put({ type: NPCAPP_SEARCH_REFRESH_NPCLIST, npc: npc.type });
        break;
      case "delete":
        yield put({ type: NPCAPP_SEARCH_FILTER_NPCLIST, npcID })
        break;
      default:
        break;
    }
  }
}

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
    call(manageSubApps, "update")
  ]);
}

function* deleteNPC(action) {
  yield call(api.npc.deleteNPC, action.npcID);
  yield all([
    put({ type: NPCEDITOR_UNLOAD_NPC }),
    call(manageSubApps, "delete")
  ]);
}