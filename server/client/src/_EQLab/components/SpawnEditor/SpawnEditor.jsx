import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { confirm } from '../form/confirm/confirm.js'
import { SubmissionError } from 'redux-form'
import diff from 'object-diff'
import { omit, pick, size } from 'lodash'
import api from '../../../api.js'
import {
  GLOBAL_LOAD_SPAWN,
  GLOBAL_UNLOAD_SPAWN,
  GLOBAL_UPDATE_SPAWN2,
  GLOBAL_DELETE_SPAWN2,
  GLOBAL_CHANGE_SPAWNGROUP,
  GLOBAL_POST_SPAWNGROUP,
  GLOBAL_UPDATE_SPAWNGROUP,
  GLOBAL_DELETE_SPAWNGROUP,
  GLOBAL_POST_SPAWNENTRY,
  GLOBAL_DELETE_SPAWNENTRY
} from '../../../constants/actionTypes'
import Spawn2 from './Spawn2/Spawn2.jsx'
import SpawnGroup from './SpawnGroup/SpawnGroup.jsx'


const mapStateToProps = state => ({
  spawn: state.global.spawn
});

const mapDispatchToProps = dispatch => ({
  load: payload =>
    dispatch({ type: GLOBAL_LOAD_SPAWN, payload }),
  unload: () =>
    dispatch({ type: GLOBAL_UNLOAD_SPAWN }),
  updateSpawn2: (spawn2ID, delta, zone) => 
    dispatch({ type: GLOBAL_UPDATE_SPAWN2, spawn2ID, delta }),
  deleteSpawn2: (spawn2ID, zone) => 
    dispatch({ type: GLOBAL_DELETE_SPAWN2, spawn2ID, zone }),
  changeSpawngroup: (spawn2ID, spawngroupID, zone) => 
    dispatch({ type: GLOBAL_CHANGE_SPAWNGROUP, spawn2ID, spawngroupID, zone }),
  newSpawngroup: (spawn2ID, zone) => 
    dispatch({ type: GLOBAL_POST_SPAWNGROUP, spawn2ID, zone }),
  updateSpawngroup: (id, delta, spawn2ID, zone) => 
    dispatch({ type: GLOBAL_UPDATE_SPAWNGROUP, id, delta, spawn2ID, zone }),
  deleteSpawngroup: (id, spawn2ID, zone) => 
    dispatch({ type: GLOBAL_DELETE_SPAWNGROUP, id, spawn2ID, zone }),
  newSpawnentry: (spawngroupID, npcID, spawn2ID, zone) => 
    dispatch({ type: GLOBAL_POST_SPAWNENTRY, spawngroupID, npcID, spawn2ID, zone}),
  deleteSpawnentry: (spawngroupID, npcID, spawn2ID, zone) => 
    dispatch({ type: GLOBAL_DELETE_SPAWNENTRY, spawngroupID, npcID, spawn2ID, zone})
});

class SpawnEditor extends React.Component {
  constructor(props) {
    super(props);

    this.submitSpawn2Form = (values, dispatch, props) => {
      return new Promise((resolve, reject) => {
        if (props.dirty && props.valid) {
          const delta = diff(props.initialValues, values);
          api.zone.putSpawn2(values.id, delta).then(res => {
            this.props.updateSpawn2(
              values.id, 
              delta,
              this.props.zone ? this.props.zone : null
            );
            resolve();
          }).catch(error => {
            if (error.validationErrors) {
              reject(new SubmissionError(error.validationErrors));
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
          api.zone.putSpawngroup(values.id, data).then(res => {
            this.props.updateSpawngroup(
              values.id, 
              delta,
              this.props.spawn.spawn2.id,
              this.props.zone ? this.props.zone : null
            );
            resolve();
          }).catch(error => {
            if (error.validationErrors) {
              reject(new SubmissionError(error.validationErrors));
            } 
          });
        }
      });
    }

    this.newSpawngroup = () => {
      this.props.newSpawngroup(
        this.props.spawn.spawn2.id, 
        this.props.zone ? this.props.zone : null
      );
    }

    this.newSpawnentry = (npcID) => {
      if (!this.props.spawn.spawngroup.spawnentries.some(o => o.npcID === npcID)) {
        this.props.newSpawnentry(
          this.props.spawn.spawngroup.id,
          npcID,
          this.props.spawn.spawn2.id,
          this.props.zone ? this.props.zone : null
        );
      }
    }

    this.deleteSpawn2 = () => {
      confirm('Are you sure you want to delete this spawn?', {
        title: 'Delete Spawn'
      }).then(() => {
        this.props.deleteSpawn2(
          this.props.spawn.spawn2.id, 
          this.props.zone ? this.props.zone : null
        );
      }, () => {});
    }

    this.changeSpawngroup = (spawngroupID) => {
      this.props.changeSpawngroup(
        this.props.spawn.spawn2.id, 
        spawngroupID,
        this.props.zone ? this.props.zone : null
      );
    }

    this.clearSpawngroup = () => {
      confirm('Are you sure?', {
        title: 'Clear Spawngroup'
      }).then(() => {
        this.props.changeSpawngroup(
          this.props.spawn.spawn2.id, 
          0,
          this.props.zone ? this.props.zone : null
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
          this.props.spawn.spawn2.id, 
          this.props.zone ? this.props.zone : null
        );
      }, () => {});
    }

    this.deleteSpawnentry = (npcID) => {
      confirm('Are you sure you want to delete this entry?'
        + ' This will remove the entry from all spawngroups that use it.', {
        title: 'Delete Spawnentry'
      }).then(() => {
        this.props.deleteSpawnentry(
          this.props.spawn.spawngroup.id,
          npcID,
          this.props.spawn.spawn2.id,
          this.props.zone ? this.props.zone : null
        );  
      }, () => {});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.spawn2ID !== this.props.spawn2ID) {
      this.props.load(api.zone.getSpawnData(nextProps.spawn2ID));
    }
  }

  componentDidMount() {
    this.props.load(api.zone.getSpawnData(this.props.spawn2ID));
  }

  componentWillUnmount() {
    this.props.unload();
  }

  render() {
    return (
      <div id="SpawnEditor">
        <Row>
          <Col md={24}>
            {
              this.props.spawn.spawn2
                ? <Spawn2
                    spawngroupName={this.props.spawn.spawngroup ? this.props.spawn.spawngroup.name : ''}
                    deleteSpawn2={this.deleteSpawn2}
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

export default connect(mapStateToProps, mapDispatchToProps)(SpawnEditor);