import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../api.js';
import {
  EQLAB_LOAD,
  EQLAB_SET_VARS
} from '../constants/actionTypes';


export const EQLabSaga = [
  takeLatest(EQLAB_LOAD, load)
];

function* load() {
  const globalVars = yield call(api.eqlab.getGlobalVariables);
  yield put({ type: EQLAB_SET_VARS, globalVars });
}