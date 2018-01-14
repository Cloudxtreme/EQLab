import { all, put, takeLatest } from 'redux-saga/effects';
import { 
  SUBAPP_UNLOAD,
  ZONEAPP_RESET
} from '../constants/actionTypes';


export const CommonSaga = [
  takeLatest(SUBAPP_UNLOAD, unloadSubApp)
];

function* unloadSubApp(action) {
  yield all([
    put({ type: ZONEAPP_RESET })
  ]);
}