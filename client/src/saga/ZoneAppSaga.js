import { all, call, put, takeLatest } from 'redux-saga/effects';
import api from '../api.js';
import {
  GLOBAL_LOAD,
  ZONEAPP_LOAD,
  ZONEAPP_SET_ZONELIST,
  ZONEAPP_SELECT_ZONE,
  ZONEAPP_SET_ZONE,
  ZONEAPP_BUILD_SPAWNTREE,
  ZONEAPP_REBUILD_SPAWNTREE,
  ZONEAPP_REFRESH_SPAWN2,
  ZONEAPP_POST_SPAWN2,
  ZONEAPP_FETCH_SPAWN2TREE
} from '../constants/actionTypes';


export const ZoneAppSaga = [
  takeLatest(ZONEAPP_LOAD, load),
  takeLatest(ZONEAPP_SELECT_ZONE, selectZone),
  takeLatest(ZONEAPP_POST_SPAWN2, postSpawn2),
  takeLatest(ZONEAPP_REBUILD_SPAWNTREE, rebuildSpawnTree),
  takeLatest(ZONEAPP_FETCH_SPAWN2TREE, fetchSpawn2Tree)
];

function* load() {
  const [globalVars, zoneList] = yield all([
    call(api.global.getGlobalVariables),
    call(api.zone.getZoneList)
  ])
  yield all([
    put({ type: GLOBAL_LOAD, globalVars }),
    put({ type: ZONEAPP_SET_ZONELIST, zoneList })
  ])
}

function* fetchSpawn2Tree(action) {
  const spawn2 = yield call(api.zone.getSingleSpawnTreeData, action.spawn2ID);
  yield put({ type: ZONEAPP_REFRESH_SPAWN2, spawn2 });
}

function* selectZone(action) {
  const spawnTree = yield call(api.zone.getSpawnTreeData, action.zone);
 
  yield all([
    put({ type: ZONEAPP_SET_ZONE, zone: action.zone }),
    put({ type: ZONEAPP_BUILD_SPAWNTREE, spawnTree })
  ]);
}

function* rebuildSpawnTree(action) {
  const spawnTree = yield call(api.zone.getSpawnTreeData, action.zone);
  yield put({ type: ZONEAPP_BUILD_SPAWNTREE, spawnTree });
}

function* postSpawn2(action) {
  yield call(api.zone.postSpawn2, action.zone);
}