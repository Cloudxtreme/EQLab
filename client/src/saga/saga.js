import { all, call, put, takeLatest } from 'redux-saga/effects'
import api from '../api.js'
import { 
  SUBAPP_UNLOAD,
  GLOBAL_RESET,
  GLOBAL_LOAD_SPAWN,
  GLOBAL_UNLOAD_SPAWN,
  GLOBAL_UPDATE_SPAWN2,
  GLOBAL_DELETE_SPAWN2,
  GLOBAL_CHANGE_SPAWNGROUP,
  GLOBAL_POST_SPAWNGROUP,
  GLOBAL_UPDATE_SPAWNGROUP,
  GLOBAL_DELETE_SPAWNGROUP,
  GLOBAL_POST_SPAWNENTRY,
  GLOBAL_DELETE_SPAWNENTRY,
  ZONEAPP_RESET,
  ZONEAPP_SELECT_ZONE,
  ZONEAPP_SET_ZONE,
  ZONEAPP_BUILD_SPAWNTREE,
  ZONEAPP_POST_SPAWN2,
  ZONEAPP_ADD_SPAWN2,
  ZONEAPP_REFRESH_SPAWN2,
  ZONEAPP_REMOVE_SPAWN2
} from '../constants/actionTypes'

export default function* rootSaga() {
  yield all([
    takeLatest(SUBAPP_UNLOAD, unloadSubApp),
    takeLatest(GLOBAL_UPDATE_SPAWN2, updateSpawn2),
    takeLatest(GLOBAL_DELETE_SPAWN2, deleteSpawn2),
    takeLatest(GLOBAL_CHANGE_SPAWNGROUP, changeSpawngroup),
    takeLatest(GLOBAL_POST_SPAWNGROUP, postSpawngroup),
    takeLatest(GLOBAL_UPDATE_SPAWNGROUP, updateSpawngroup),
    takeLatest(GLOBAL_DELETE_SPAWNGROUP, deleteSpawngroup),
    takeLatest(GLOBAL_POST_SPAWNENTRY, postSpawnentry),
    takeLatest(GLOBAL_DELETE_SPAWNENTRY, deleteSpawnentry),
    takeLatest(ZONEAPP_SELECT_ZONE, selectZone),
    takeLatest(ZONEAPP_POST_SPAWN2, postSpawn2)
  ]);
}

function* unloadSubApp(action) {
  yield all([
    put({ type: GLOBAL_RESET }),
    put({ type: ZONEAPP_RESET })
  ]);
}

function* selectZone(action) {
  const [spawnTree] = yield all([
    call(api.zone.getSpawnTreeData, action.zone)
  ]);

  yield all([
    put({ type: ZONEAPP_SET_ZONE, zone: action.zone }),
    put({ type: ZONEAPP_BUILD_SPAWNTREE, spawnTree })
  ]);
}


/*
*  --------------------REFRESH
*/

function* refreshSingleSpawnTree(spawn2ID) {
  const spawn2 = yield call(api.zone.getSingleSpawnTreeData, spawn2ID);
  yield put({ type: ZONEAPP_REFRESH_SPAWN2, spawn2 });
}

function* refreshSpawnData(spawn2ID) {
  const spawn = yield call(api.zone.getSpawnData, spawn2ID);
  yield put({ type: GLOBAL_LOAD_SPAWN, payload: spawn });
}

/*
*  --------------------SPAWN 2
*/

function* postSpawn2(action) {
  yield put({ type: ZONEAPP_ADD_SPAWN2, data: action.data });
}

function* updateSpawn2(action) {
  yield all([
    call(refreshSpawnData, action.spawn2ID),
    action.zone && call(refreshSingleSpawnTree, action.spawn2ID)
  ]);
}

function* deleteSpawn2(action) {
  yield call(api.zone.deleteSpawn2, action.spawn2ID);
  yield all([
    put({ type: GLOBAL_UNLOAD_SPAWN }),
    put({ type: ZONEAPP_REMOVE_SPAWN2, spawn2ID: action.spawn2ID })
  ]);
}

function* changeSpawngroup(action) {
  yield call(api.zone.putSpawn2, action.spawn2ID, { "spawngroupID": action.spawngroupID });
  yield all([
    call(refreshSpawnData, action.spawn2ID),
    action.zone && call(refreshSingleSpawnTree, action.spawn2ID)
  ]);
}

/*
*  --------------------SPAWNGROUP
*/

function* postSpawngroup(action) {
  yield call(api.zone.postSpawngroup, action.spawn2ID, action.zone);
  yield all([
    call(refreshSpawnData, action.spawn2ID),
    action.zone && call(refreshSingleSpawnTree, action.spawn2ID)
  ]);
}

function* updateSpawngroup(action) {
  yield all([
    call(refreshSpawnData, action.spawn2ID),
    action.zone && call(refreshSingleSpawnTree, action.spawn2ID)
  ]);
}

function* deleteSpawngroup(action) {
  yield call(api.zone.deleteSpawngroup, action.id);
  yield all([
    call(refreshSpawnData, action.spawn2ID),
    action.zone && call(refreshSingleSpawnTree, action.spawn2ID)
  ]);
}

/*
*  --------------------SPAWNENTRY
*/

function* postSpawnentry(action) {
  yield call(api.zone.postSpawnentry, action.spawngroupID, action.npcID);
  yield all([
    call(refreshSpawnData, action.spawn2ID),
    action.zone && call(refreshSingleSpawnTree, action.spawn2ID)
  ]);
}

function* deleteSpawnentry(action) {
  yield call(api.zone.deleteSpawnentry, action.spawngroupID, action.npcID);
  yield all([
    call(refreshSpawnData, action.spawn2ID),
    action.zone && call(refreshSingleSpawnTree, action.spawn2ID)
  ]);
}