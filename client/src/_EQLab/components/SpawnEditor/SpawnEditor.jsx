import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { confirm } from '../form/confirm/confirm.js';
import { SubmissionError } from 'redux-form';
import { diff } from 'deep-object-diff';
import { omit, pick, size } from 'lodash';
import api from '../../../api.js';
import { debounce } from 'lodash';
import {
  SPAWNEDITOR_UNLOAD_SPAWN,
  SPAWNEDITOR_GET_SPAWN2,
  SPAWNEDITOR_UPDATE_SPAWN2,
  SPAWNEDITOR_DELETE_SPAWN2,
  SPAWNEDITOR_SET_SPAWNGROUP_OPTIONS,
  SPAWNEDITOR_CHANGE_SPAWNGROUP,
  SPAWNEDITOR_POST_SPAWNGROUP,
  SPAWNEDITOR_DELETE_SPAWNGROUP,
  SPAWNEDITOR_SET_NPC_OPTIONS,
  SPAWNEDITOR_POST_SPAWNENTRY,
  SPAWNEDITOR_DELETE_SPAWNENTRY
} from '../../../constants/actionTypes';
import Spawn2 from './Spawn2/Spawn2.jsx';
import SpawnGroup from './SpawnGroup/SpawnGroup.jsx';


const mapStateToProps = state => ({
  isLoaded: state.SpawnEditor.isLoaded,
  spawn: state.SpawnEditor.spawn
});

const mapDispatchToProps = dispatch => ({
  load: spawn2ID =>
    dispatch({ type: SPAWNEDITOR_GET_SPAWN2, spawn2ID }),
  unload: () =>
    dispatch({ type: SPAWNEDITOR_UNLOAD_SPAWN }),
  updateSpawn2: (spawn2ID, spawngroupID) => 
    dispatch({ type: SPAWNEDITOR_UPDATE_SPAWN2, spawn2ID, spawngroupID }),
  deleteSpawn2: (spawn2ID) => 
    dispatch({ type: SPAWNEDITOR_DELETE_SPAWN2, spawn2ID }),
  setSpawngroupOptions: (options) => 
    dispatch({ type: SPAWNEDITOR_SET_SPAWNGROUP_OPTIONS, options }),
  changeSpawngroup: (spawn2ID, spawngroupID) => 
    dispatch({ type: SPAWNEDITOR_CHANGE_SPAWNGROUP, spawn2ID, spawngroupID }),
  postSpawngroup: (spawn2ID) => 
    dispatch({ type: SPAWNEDITOR_POST_SPAWNGROUP, spawn2ID }),
  deleteSpawngroup: (spawngroupID, spawn2ID) => 
    dispatch({ type: SPAWNEDITOR_DELETE_SPAWNGROUP, spawngroupID, spawn2ID }),
  setNPCOptions: (options) => 
    dispatch({ type: SPAWNEDITOR_SET_NPC_OPTIONS, options }),
  postSpawnentry: (spawngroupID, npcID, spawn2ID) => 
    dispatch({ type: SPAWNEDITOR_POST_SPAWNENTRY, spawngroupID, npcID, spawn2ID }),
  deleteSpawnentry: (spawngroupID, npcID, spawn2ID) => 
    dispatch({ type: SPAWNEDITOR_DELETE_SPAWNENTRY, spawngroupID, npcID, spawn2ID })
});

class SpawnEditor extends React.Component {
  constructor(props) {
    super(props);

    this.submitSpawn2Form = (values, dispatch, props) => {
      return new Promise((resolve, reject) => {
        if (props.dirty && props.valid) {
          const delta = diff(props.initialValues, values);
          api.zone.patchSpawn2(values.id, delta)
            .then(res => {
              this.props.updateSpawn2(
                values.id,
                null
              );
              resolve();
            })
            .catch(error => {
              if (error.response.body.validationErrors) {
                reject(new SubmissionError(error.response.body.validationErrors));
              } 
            });
          }
      });
    }

    this.submitSpawngroupForm = (values, dispatch, props) => {
      return new Promise((resolve, reject) => {
        if (props.dirty && props.valid) {
          const delta = diff(props.initialValues, values);
          const spawngroup = omit(delta, ['spawnentries']);
          const data = {
            spawngroup: size(spawngroup) ? spawngroup : null,
            spawnentries: delta.spawnentries ? 
              delta.spawnentries.map(entry => {
                return pick(entry, ['spawngroupID', 'npcID', 'chance'])
              })
              : null
          }
          api.zone.patchSpawngroup(values.id, data).then(res => {
            this.props.updateSpawn2(
              this.props.spawn.spawn2.id, 
              values.id
            );
            resolve();
          }).catch(error => {
            if (error.response.body.validationErrors) {
              reject(new SubmissionError(error.response.body.validationErrors));
            } 
          });
        }
      });
    }

    this.newSpawngroup = () => {
      this.props.postSpawngroup(
        this.props.spawn.spawn2.id
      );
    }

    this.newSpawnentry = (npcID) => {
      if (!this.props.spawn.spawngroup.spawnentries.some(o => o.npcID === npcID)) {
        this.props.postSpawnentry(
          this.props.spawn.spawngroup.id,
          npcID,
          this.props.spawn.spawn2.id
        );
      }
    }

    this.deleteSpawn2 = () => {
      confirm('Are you sure you want to delete this spawn?', {
        title: 'Delete Spawn'
      }).then(() => {
        this.props.deleteSpawn2(
          this.props.spawn.spawn2.id
        );
      }, () => {});
    }

    this.searchSpawngroups = debounce((input) => {
      let options;

      if (input.length > 2) {
        api.zone.searchSpawngroupOptions(input ? input : this.props.spawn.spawn2.spawngroupID)
          .then(results => {
            options = results.map(spawngroup => {
              return {
                id: spawngroup.id,
                label: `${spawngroup.name} (${spawngroup.id})`
              }
            });
            this.props.setSpawngroupOptions(options);
          })
          .catch(error => null);
      }
    }, 400);

    this.searchNPCs = debounce((input) => {
      let options;

      if (input.length > 2) {
        api.npc.searchNPCOptions(input ? input : '')
          .then(results => {
            options = results.map(npc => {
              return {
                id: npc.id,
                label: `${npc.name} (${npc.id})`
              }
            });
            this.props.setNPCOptions(options);
          })
          .catch(error => null);
      }
    }, 400);

    this.changeSpawngroup = (spawngroup) => {
      if (spawngroup) {
        this.props.changeSpawngroup(
          this.props.spawn.spawn2.id, 
          spawngroup.id
        );
      }
    }

    this.clearSpawngroup = () => {
      confirm('Are you sure?', {
        title: 'Clear Spawngroup'
      }).then(() => {
        this.props.changeSpawngroup(
          this.props.spawn.spawn2.id, 
          0
        );
      }, () => {});
    }

    this.deleteSpawngroup = () => {
      confirm('Are you sure you want to delete this spawngroup?'
        + ' This will remove the spawngroup from all spawns that use it.', {
        title: 'Delete Spawngroup'
      }).then(() => {
        this.props.deleteSpawngroup(
          this.props.spawn.spawngroup.id, 
          this.props.spawn.spawn2.id
        );
      }, () => {});
    }

    this.deleteSpawnentry = (e) => {
      const npcID = parseInt(e.currentTarget.id, 10);

      confirm('Are you sure you want to delete this entry?'
        + ' This will remove the entry from all spawngroups that use it.', {
        title: 'Delete Spawnentry'
      }).then(() => {
        this.props.deleteSpawnentry(
          this.props.spawn.spawngroup.id,
          npcID,
          this.props.spawn.spawn2.id
        );  
      }, () => {});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoaded && (nextProps.spawn2ID !== this.props.spawn2ID)) {
      this.props.load(nextProps.spawn2ID);
    }
  }

  componentDidMount() {
    this.props.load(this.props.spawn2ID);
  }

  componentWillUnmount() {
    this.props.unload();
  }

  render() {
    if (!this.props.isLoaded) {
      return null;
    } else {
      return (
        <div id="SpawnEditor">
          <Row>
            <Col md={24}>
              {
                this.props.spawn.spawn2
                  ? <Spawn2
                      spawngroupName={this.props.spawn.spawngroup ? this.props.spawn.spawngroup.name : ''}
                      deleteSpawn2={this.deleteSpawn2}
                      searchSpawngroups={this.searchSpawngroups}
                      changeSpawngroup={this.changeSpawngroup}
                      clearSpawngroup={this.clearSpawngroup}
                      newSpawngroup={this.newSpawngroup} 
                      onSubmit={this.submitSpawn2Form} />
                  : null
              } 
            </Col>
          </Row>
          <Row>
            <Col md={24}>
              {
                this.props.spawn.spawngroup
                  ? <SpawnGroup
                      deleteSpawngroup={this.deleteSpawngroup} 
                      searchNPCs={this.searchNPCs}
                      newSpawnentry={this.newSpawnentry} 
                      deleteSpawnentry={this.deleteSpawnentry}
                      onSubmit={this.submitSpawngroupForm} />
                  : null
              }
            </Col>
          </Row>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpawnEditor);