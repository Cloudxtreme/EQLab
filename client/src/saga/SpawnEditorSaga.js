import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import api from '../api.js';
import { 
  ZONEAPP_SPAWNS_REFRESH_SPAWN2,
  ZONEAPP_SPAWNS_FILTER_SPAWN2,
  ZONEAPP_SPAWNS_FILTER_SPAWNGROUP,
  SPAWNEDITOR_LOAD_SPAWN,
  SPAWNEDITOR_UNLOAD_SPAWN,
  SPAWNEDITOR_GET_SPAWN2,
  SPAWNEDITOR_UPDATE_SPAWN2,
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
  getCurrentSpawn2ID,
  getCurrentSpawngroupID
} from './selectors.js';


function* manageSubApps(action) {
  const ZoneAppLoaded = yield select(getZoneAppStatus);
 
  if (ZoneAppLoaded) {
    const spawn2ID = yield select(getCurrentSpawn2ID);

    switch(action) {
      case "update-spawn2":
        const spawn2 = yield call(api.zone.getSingleSpawn2Tree, spawn2ID);
        yield put({ type: ZONEAPP_SPAWNS_REFRESH_SPAWN2, spawn2 });
        break;
      case "delete-spawn2":
        yield put({ type: ZONEAPP_SPAWNS_FILTER_SPAWN2, spawn2ID })
        break;
      case "delete-spawngroup":
        const spawngroupID = yield select(getCurrentSpawngroupID);
        yield put({ type: ZONEAPP_SPAWNS_FILTER_SPAWNGROUP, spawngroupID })
        break;
      default:
        break;
    }
  }
}

export const SpawnEditorSaga = [
  takeLatest(SPAWNEDITOR_GET_SPAWN2, getSpawn2),
  takeLatest(SPAWNEDITOR_UPDATE_SPAWN2, updateSpawn2),
  takeLatest(SPAWNEDITOR_DELETE_SPAWN2, deleteSpawn2),
  takeLatest(SPAWNEDITOR_CHANGE_SPAWNGROUP, changeSpawngroup),
  takeLatest(SPAWNEDITOR_POST_SPAWNGROUP, postSpawngroup),
  takeLatest(SPAWNEDITOR_DELETE_SPAWNGROUP, deleteSpawngroup),
  takeLatest(SPAWNEDITOR_POST_SPAWNENTRY, postSpawnentry),
  takeLatest(SPAWNEDITOR_DELETE_SPAWNENTRY, deleteSpawnentry)
];

/*
*  --------------------SPAWN 2
*/

function* getSpawn2(action) {
  const spawn = yield call(api.zone.getSpawn2, action.spawn2ID);
  yield put({ type: SPAWNEDITOR_LOAD_SPAWN, payload: spawn });
}

function* updateSpawn2(action) {
  yield all([
    put({ type: SPAWNEDITOR_GET_SPAWN2, spawn2ID: action.spawn2ID }),
    call(manageSubApps, "update-spawn2")
  ]);
}

function* changeSpawngroup(action) {
  yield call(api.zone.patchSpawn2, action.spawn2ID, { spawngroupID: action.spawngroupID });
  yield all([
    put({ type: SPAWNEDITOR_GET_SPAWN2, spawn2ID: action.spawn2ID }),
    call(manageSubApps, "update-spawn2")
  ]);
}

function* deleteSpawn2(action) {
  yield call(api.zone.deleteSpawn2, action.spawn2ID);
  yield all([
    put({ type: SPAWNEDITOR_UNLOAD_SPAWN }),
    call(manageSubApps, "delete-spawn2")
  ]);
}

/*
*  --------------------SPAWNGROUP
*/

function* postSpawngroup(action) {
  let zone;
  const isZoneAppLoaded = yield select(getZoneAppStatus);
  isZoneAppLoaded ? zone = yield select(getCurrentZone) : zone = null;
  yield call(api.zone.postSpawngroup, action.spawn2ID, zone);
  yield all([
    put({ type: SPAWNEDITOR_GET_SPAWN2, spawn2ID: action.spawn2ID }),
    call(manageSubApps, "update-spawn2")
  ]);
}

function* deleteSpawngroup(action) {
  yield call(api.zone.deleteSpawngroup, action.spawngroupID);
  yield all([
    put({ type: SPAWNEDITOR_GET_SPAWN2, spawn2ID: action.spawn2ID }),
    call(manageSubApps, "delete-spawngroup")
  ]);
}

/*
*  --------------------SPAWNENTRY
*/

function* postSpawnentry(action) {
  yield call(api.zone.postSpawnentry, action.spawngroupID, action.npcID);
  yield all([
    put({ type: SPAWNEDITOR_GET_SPAWN2, spawn2ID: action.spawn2ID }),
    call(manageSubApps, "update-spawn2")
  ]);
}

function* deleteSpawnentry(action) {
  yield call(api.zone.deleteSpawnentry, action.spawngroupID, action.npcID);
  yield all([
    put({ type: SPAWNEDITOR_GET_SPAWN2, spawn2ID: action.spawn2ID }),
    call(manageSubApps, "update-spawn2")
  ]);
}
