import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { confirm } from '../form/confirm/confirm.js';
import { SubmissionError } from 'redux-form';
import diff from 'object-diff';
import { omit, pick, size, isEmpty } from 'lodash';
import api from '../../../api.js';
import { debounce } from 'lodash';
import {
  SPAWNEDITOR_FETCH_SPAWN,
  SPAWNEDITOR_UNLOAD_SPAWN,
  SPAWNEDITOR_UPDATE_SPAWN2,
  SPAWNEDITOR_DELETE_SPAWN2,
  SPAWNEDITOR_CHANGE_SPAWNGROUP,
  SPAWNEDITOR_POST_SPAWNGROUP,
  SPAWNEDITOR_UPDATE_SPAWNGROUP,
  SPAWNEDITOR_DELETE_SPAWNGROUP,
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
    dispatch({ type: SPAWNEDITOR_FETCH_SPAWN, spawn2ID }),
  unload: () =>
    dispatch({ type: SPAWNEDITOR_UNLOAD_SPAWN }),
  updateSpawn2: (spawn2ID, delta, zone) => 
    dispatch({ type: SPAWNEDITOR_UPDATE_SPAWN2, spawn2ID, delta }),
  deleteSpawn2: (spawn2ID, zone) => 
    dispatch({ type: SPAWNEDITOR_DELETE_SPAWN2, spawn2ID, zone }),
  changeSpawngroup: (spawn2ID, spawngroupID, zone) => 
    dispatch({ type: SPAWNEDITOR_CHANGE_SPAWNGROUP, spawn2ID, spawngroupID, zone }),
  newSpawngroup: (spawn2ID, zone) => 
    dispatch({ type: SPAWNEDITOR_POST_SPAWNGROUP, spawn2ID, zone }),
  updateSpawngroup: (id, delta, spawn2ID, zone) => 
    dispatch({ type: SPAWNEDITOR_UPDATE_SPAWNGROUP, id, delta, spawn2ID, zone }),
  deleteSpawngroup: (id, spawn2ID, zone) => 
    dispatch({ type: SPAWNEDITOR_DELETE_SPAWNGROUP, id, spawn2ID, zone }),
  newSpawnentry: (spawngroupID, npcID, spawn2ID, zone) => 
    dispatch({ type: SPAWNEDITOR_POST_SPAWNENTRY, spawngroupID, npcID, spawn2ID, zone}),
  deleteSpawnentry: (spawngroupID, npcID, spawn2ID, zone) => 
    dispatch({ type: SPAWNEDITOR_DELETE_SPAWNENTRY, spawngroupID, npcID, spawn2ID, zone})
});

class SpawnEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spawngroupSearchTerms: ''
    }

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

    this.fetchSpawngroupOptions = () => {
      // let spawngroupID = this.props.spawn.spawn2.spawngroupID;
      // let spawngroupName = this.props.spawn.spawngroup.name;
      // let input = this.state.spawngroupSearchTerms;
      // let options;

      // if (spawngroupID === 0 && input === '') {
      //   return [];
      // } else if (spawngroupID !== 0 && input === '') {
      //   console.log(spawngroupID)
      //   return [{ id: spawngroupID, label: `${spawngroupName} (${spawngroupID})` }];
      // } else if (input.length > 2 || input === '') {
      //   api.zone.searchSpawngroups(input ? input : spawngroupID)
      //     .then(results => {
      //       options = results.map(spawngroup => {
      //         return {
      //           id: spawngroup.id,
      //           label: `${spawngroup.name} (${spawngroup.id})`
      //         }
      //       });
      //       return options;
      //     })
      //     .catch(error => null);
      // } else {
      //   return [];
      // }
    }

    this.searchSpawngroups = debounce((input) => {
      this.setState({ spawngroupSearchTerms: input });
    }, 400);

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

      console.log(this.props)
      const spawngroupOptions = this.fetchSpawngroupOptions();

      
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
                      spawngroupOptions={spawngroupOptions}
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
}

export default connect(mapStateToProps, mapDispatchToProps)(SpawnEditor);