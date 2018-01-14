import { all, call, put, takeLatest } from 'redux-saga/effects';
import api from '../api.js';
import { 
  ZONEAPP_FETCH_SPAWN2TREE,
  ZONEAPP_REMOVE_SPAWN2,
  SPAWNEDITOR_FETCH_SPAWN,
  SPAWNEDITOR_LOAD_SPAWN,
  SPAWNEDITOR_UNLOAD_SPAWN,
  SPAWNEDITOR_UPDATE_SPAWN2,
  SPAWNEDITOR_DELETE_SPAWN2,
  SPAWNEDITOR_CHANGE_SPAWNGROUP,
  SPAWNEDITOR_POST_SPAWNGROUP,
  SPAWNEDITOR_UPDATE_SPAWNGROUP,
  SPAWNEDITOR_DELETE_SPAWNGROUP,
  SPAWNEDITOR_POST_SPAWNENTRY,
  SPAWNEDITOR_DELETE_SPAWNENTRY
} from '../constants/actionTypes';


export const SpawnEditorSaga = [
  takeLatest(SPAWNEDITOR_FETCH_SPAWN, fetchSpawn),
  takeLatest(SPAWNEDITOR_UPDATE_SPAWN2, updateSpawn2),
  takeLatest(SPAWNEDITOR_DELETE_SPAWN2, deleteSpawn2),
  takeLatest(SPAWNEDITOR_CHANGE_SPAWNGROUP, changeSpawngroup),
  takeLatest(SPAWNEDITOR_POST_SPAWNGROUP, postSpawngroup),
  takeLatest(SPAWNEDITOR_UPDATE_SPAWNGROUP, updateSpawngroup),
  takeLatest(SPAWNEDITOR_DELETE_SPAWNGROUP, deleteSpawngroup),
  takeLatest(SPAWNEDITOR_POST_SPAWNENTRY, postSpawnentry),
  takeLatest(SPAWNEDITOR_DELETE_SPAWNENTRY, deleteSpawnentry)
];
  
function* fetchSpawn(action) {
  const spawn = yield call(api.zone.getSpawnData, action.spawn2ID);
  yield put({ type: SPAWNEDITOR_LOAD_SPAWN, payload: spawn });
}

/*
*  --------------------SPAWN 2
*/

function* updateSpawn2(action) {
  yield all([
    put({ type: SPAWNEDITOR_FETCH_SPAWN, spawn2ID: action.spawn2ID }),
    action.zone && put({ type: ZONEAPP_FETCH_SPAWN2TREE, spawn2ID: action.spawn2ID })
  ]);
}

function* deleteSpawn2(action) {
  yield call(api.zone.deleteSpawn2, action.spawn2ID);
  yield all([
    put({ type: SPAWNEDITOR_UNLOAD_SPAWN }),
    action.zone && put({ type: ZONEAPP_REMOVE_SPAWN2, spawn2ID: action.spawn2ID })
  ]);
}

function* changeSpawngroup(action) {
  yield call(api.zone.putSpawn2, action.spawn2ID, { spawngroupID: action.spawngroupID });
  yield all([
    put({ type: SPAWNEDITOR_FETCH_SPAWN, spawn2ID: action.spawn2ID }),
    action.zone && put({ type: ZONEAPP_FETCH_SPAWN2TREE, spawn2ID: action.spawn2ID })
  ]);
}

/*
*  --------------------SPAWNGROUP
*/

function* postSpawngroup(action) {
  yield call(api.zone.postSpawngroup, action.spawn2ID, action.zone);
  yield all([
    put({ type: SPAWNEDITOR_FETCH_SPAWN, spawn2ID: action.spawn2ID }),
    action.zone && put({ type: ZONEAPP_FETCH_SPAWN2TREE, spawn2ID: action.spawn2ID })
  ]);
}

function* updateSpawngroup(action) {
  yield all([
    put({ type: SPAWNEDITOR_FETCH_SPAWN, spawn2ID: action.spawn2ID }),
    action.zone && put({ type: ZONEAPP_FETCH_SPAWN2TREE, spawn2ID: action.spawn2ID })
  ]);
}

function* deleteSpawngroup(action) {
  yield call(api.zone.deleteSpawngroup, action.id);
  yield all([
    put({ type: SPAWNEDITOR_FETCH_SPAWN, spawn2ID: action.spawn2ID }),
    action.zone && put({ type: ZONEAPP_FETCH_SPAWN2TREE, spawn2ID: action.spawn2ID })
  ]);
}

/*
*  --------------------SPAWNENTRY
*/

function* postSpawnentry(action) {
  yield call(api.zone.postSpawnentry, action.spawngroupID, action.npcID);
  yield all([
    put({ type: SPAWNEDITOR_FETCH_SPAWN, spawn2ID: action.spawn2ID }),
    action.zone && put({ type: ZONEAPP_FETCH_SPAWN2TREE, spawn2ID: action.spawn2ID })
  ]);
}

function* deleteSpawnentry(action) {
  yield call(api.zone.deleteSpawnentry, action.spawngroupID, action.npcID);
  yield all([
    put({ type: SPAWNEDITOR_FETCH_SPAWN, spawn2ID: action.spawn2ID }),
    action.zone && put({ type: ZONEAPP_FETCH_SPAWN2TREE, spawn2ID: action.spawn2ID })
  ]);
}
