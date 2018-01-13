import { all } from 'redux-saga/effects';
import { CommonSaga } from './CommonSaga.js';
import { ZoneAppSaga } from './ZoneAppSaga.js';
import { SpawnEditorSaga } from './SpawnEditorSaga.js';
import { NPCEditorSaga } from './NPCEditorSaga.js';


export default function* rootSaga() {
  yield all([
    ...CommonSaga,
    ...ZoneAppSaga,
    ...SpawnEditorSaga,
    ...NPCEditorSaga
  ])
}