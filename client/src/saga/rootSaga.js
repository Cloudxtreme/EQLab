import { all } from 'redux-saga/effects';
import { EQLabSaga } from './EQLabSaga.js';
import { ZoneAppSaga } from './ZoneAppSaga.js';
import { NPCAppSaga } from './NPCAppSaga.js';
import { SpawnEditorSaga } from './SpawnEditorSaga.js';
import { NPCEditorSaga } from './NPCEditorSaga.js';
import { SpellEditorSaga } from './SpellEditorSaga.js';


export default function* rootSaga() {
  yield all([
    ...EQLabSaga,
    ...ZoneAppSaga,
    ...NPCAppSaga,
    ...SpawnEditorSaga,
    ...NPCEditorSaga,
    ...SpellEditorSaga
  ]);
}