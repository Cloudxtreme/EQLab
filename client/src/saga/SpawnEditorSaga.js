import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import api from '../api.js';
import { 
  ZONEAPP_SPAWNS_GET_SPAWN2TREE,
  ZONEAPP_SPAWNS_GET_SPAWNGROUPTREE,
  ZONEAPP_SPAWNS_REMOVE_SPAWN2,
  ZONEAPP_SPAWNS_REMOVE_SPAWNGROUP,
  SPAWNEDITOR_LOAD_SPAWN,
  SPAWNEDITOR_UNLOAD_SPAWN,
  SPAWNEDITOR_GET_SPAWN2,
  SPAWNEDITOR_REFRESH_SPAWN2,
  SPAWNEDITOR_DELETE_SPAWN2,
  SPAWNEDITOR_CHANGE_SPAWNGROUP,
  SPAWNEDITOR_POST_SPAWNGROUP,
  SPAWNEDITOR_DELETE_SPAWNGROUP,
  SPAWNEDITOR_POST_SPAWNENTRY,
  SPAWNEDITOR_DELETE_SPAWNENTRY
} from '../constants/actionTypes.js';
import { 
  getZoneAppStatus,
  getCurrentZone,
} from './selectors.js';


export const SpawnEditorSaga = [
  takeLatest(SPAWNEDITOR_GET_SPAWN2, getSpawn2),
  takeLatest(SPAWNEDITOR_REFRESH_SPAWN2, refreshSpawn2),
  takeLatest(SPAWNEDITOR_DELETE_SPAWN2, deleteSpawn2),
  takeLatest(SPAWNEDITOR_CHANGE_SPAWNGROUP, changeSpawngroup),
  takeLatest(SPAWNEDITOR_POST_SPAWNGROUP, postSpawngroup),
  takeLatest(SPAWNEDITOR_DELETE_SPAWNGROUP, deleteSpawngroup),
  takeLatest(SPAWNEDITOR_POST_SPAWNENTRY, postSpawnentry),
  takeLatest(SPAWNEDITOR_DELETE_SPAWNENTRY, deleteSpawnentry)
];
  
function* getSpawn2(action) {
  const spawn = yield call(api.zone.getSpawn2, action.spawn2ID);
  yield put({ type: SPAWNEDITOR_LOAD_SPAWN, payload: spawn });
}

/*
*  --------------------SPAWN 2
*/

function* refreshSpawn2(action) {
  const isZoneAppLoaded = yield select(getZoneAppStatus);
  yield all([
    put({ type: SPAWNEDITOR_GET_SPAWN2, spawn2ID: action.spawn2ID }),
    action.spawngroupID && isZoneAppLoaded
      ? put({ type: ZONEAPP_SPAWNS_GET_SPAWNGROUPTREE, spawngroupID: action.spawngroupID })
      : isZoneAppLoaded
          ? put({ type: ZONEAPP_SPAWNS_GET_SPAWN2TREE, spawn2ID: action.spawn2ID })
          : null
  ]);
}

function* deleteSpawn2(action) {
  yield call(api.zone.deleteSpawn2, action.spawn2ID);
  yield all([
    put({ type: SPAWNEDITOR_UNLOAD_SPAWN }),
    action.zone && put({ type: ZONEAPP_SPAWNS_REMOVE_SPAWN2, spawn2ID: action.spawn2ID })
  ]);
}

function* changeSpawngroup(action) {
  yield call(api.zone.putSpawn2, action.spawn2ID, { spawngroupID: action.spawngroupID });
  yield put({ type: SPAWNEDITOR_REFRESH_SPAWN2, spawn2ID: action.spawn2ID });
}

/*
*  --------------------SPAWNGROUP
*/

function* postSpawngroup(action) {
  let zone;
  const isZoneAppLoaded = yield select(getZoneAppStatus);
  isZoneAppLoaded ? zone = yield select(getCurrentZone) : zone = null;
  yield call(api.zone.postSpawngroup, action.spawn2ID, zone);
  yield put({ type: SPAWNEDITOR_REFRESH_SPAWN2, spawn2ID: action.spawn2ID });
}

function* deleteSpawngroup(action) {
  yield call(api.zone.deleteSpawngroup, action.spawngroupID);
  yield all([
    put({ type: SPAWNEDITOR_GET_SPAWN2, spawn2ID: action.spawn2ID }),
    action.zone && put({ type: ZONEAPP_SPAWNS_REMOVE_SPAWNGROUP, spawngroupID: action.spawngroupID })
  ]);
}

/*
*  --------------------SPAWNENTRY
*/

function* postSpawnentry(action) {
  yield call(api.zone.postSpawnentry, action.spawngroupID, action.npcID);
  yield put({ type: SPAWNEDITOR_REFRESH_SPAWN2, spawn2ID: action.spawn2ID, spawngroupID: action.spawngroupID });
}

function* deleteSpawnentry(action) {
  yield call(api.zone.deleteSpawnentry, action.spawngroupID, action.npcID);
  yield put({ type: SPAWNEDITOR_REFRESH_SPAWN2, spawn2ID: action.spawn2ID, spawngroupID: action.spawngroupID });
}
