import { all, call, put, takeLatest } from 'redux-saga/effects';
import api from '../api.js';
import {
  GLOBAL_LOAD,
  ZONEAPP_LOAD,
  ZONEAPP_SET_ZONELIST,
  ZONEAPP_SELECT_ZONE,
  ZONEAPP_SET_ZONE,
  ZONEAPP_SPAWNS_BUILD_SPAWNTREE,
  ZONEAPP_SPAWNS_REBUILD_SPAWNTREE,
  ZONEAPP_SPAWNS_GET_SPAWN2TREE,
  ZONEAPP_SPAWNS_GET_SPAWNGROUPTREE,
  ZONEAPP_SPAWNS_POST_SPAWN2,
  ZONEAPP_SPAWNS_REFRESH_SPAWN2,
  ZONEAPP_SPAWNS_REFRESH_SPAWNGROUP
} from '../constants/actionTypes';


export const ZoneAppSaga = [
  takeLatest(ZONEAPP_LOAD, load),
  takeLatest(ZONEAPP_SELECT_ZONE, selectZone),
  takeLatest(ZONEAPP_SPAWNS_POST_SPAWN2, postSpawn2),
  takeLatest(ZONEAPP_SPAWNS_REBUILD_SPAWNTREE, rebuildSpawnTree),
  takeLatest(ZONEAPP_SPAWNS_GET_SPAWN2TREE, getSingleSpawn2Tree),
  takeLatest(ZONEAPP_SPAWNS_GET_SPAWNGROUPTREE, getSingleSpawngroupTree)
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

function* getSingleSpawn2Tree(action) {
  const spawn2 = yield call(api.zone.getSingleSpawn2Tree, action.spawn2ID);
  yield put({ type: ZONEAPP_SPAWNS_REFRESH_SPAWN2, spawn2 });
}

function* getSingleSpawngroupTree(action) {
  const spawngroup = yield call(api.zone.getSingleSpawngroupTree, action.spawngroupID);
  yield put({ type: ZONEAPP_SPAWNS_REFRESH_SPAWNGROUP, spawngroup });
}

function* selectZone(action) {
  const spawnTree = yield call(api.zone.getFullSpawnTree, action.zone);
 
  yield all([
    put({ type: ZONEAPP_SET_ZONE, zone: action.zone }),
    put({ type: ZONEAPP_SPAWNS_BUILD_SPAWNTREE, spawnTree })
  ]);
}

function* rebuildSpawnTree(action) {
  const spawnTree = yield call(api.zone.getFullSpawnTree, action.zone);
  yield put({ type: ZONEAPP_SPAWNS_BUILD_SPAWNTREE, spawnTree });
}

function* postSpawn2(action) {
  yield call(api.zone.postSpawn2, action.zone);
}