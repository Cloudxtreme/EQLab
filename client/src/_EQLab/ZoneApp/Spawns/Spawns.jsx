import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import FontAwesome from 'react-fontawesome';
import {
  ZONEAPP_SET_SPAWNS_MODE, 
  ZONEAPP_POST_SPAWN2
} from '../../../constants/actionTypes';
import SpawnEditor from '../../components/SpawnEditor/SpawnEditor.jsx';
import NPCEditor from '../../components/NPCEditor/NPCEditor.jsx';

const mapStateToProps = state => ({
  mode: state.ZoneApp.spawnsMode,
  id: state.ZoneApp.spawnsID
});

const mapDispatchToProps = dispatch => ({
  setMode: (mode, spawnsID) =>
    dispatch({ type: ZONEAPP_SET_SPAWNS_MODE, mode, spawnsID }),
  postSpawn2: (zone) =>
    dispatch({ type: ZONEAPP_POST_SPAWN2, zone })
});

class Spawns extends React.Component {
  constructor(props) {
    super(props);
   
    this.newSpawn2 = () => {
      if (this.props.zone) {
        this.props.postSpawn2(this.props.zone);
      }
    }

    this.handleSpawn = (e) => {
      let id = e.target.id;

      if (this.props.mode !== 'spawn' || (this.props.mode === 'spawn' && id !== this.props.id)) {
        this.props.setMode('spawn', id);
      }
    }

    this.handleNPC = (e) => {
      let id = e.target.id;

      if (this.props.mode !== 'npc' || (this.props.mode === 'npc' && id !== this.props.id)) {
        this.props.setMode('npc', id);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.zone && nextProps.zone !== this.props.zone) || (!nextProps.zone && nextProps.zone !== this.props.zone)) {
      this.props.setMode('', null);
    }
  }

  render() {

    const columns = [{
      Header: row => {
          return (
            <Button 
              bsStyle="primary" 
              bsSize="xs"
              className="pull-left" 
              onClick={this.newSpawn2}
              disabled={ this.props.zone ? false : true } 
            >
              <FontAwesome name="plus" />&nbsp;New Spawn
            </Button>
          )
      },
      columns: [{
        Header: 'spawn2',
        accessor: 'id',
        width: 80,
        sortable: true,
        resizable: false, 
        filterable: true,
        Cell: row => { 
          return <a onClick={this.handleSpawn} key={row.value} id={row.value}>{row.value}</a>
        }
      }, {
        Header: 'v',
        accessor: 'version',
        width: 50,
        sortable: true, 
        resizable: false, 
        filterable: true
      }, {
        Header: 'e',
        accessor: 'enabled',
        width: 50,
        sortable: true, 
        resizable: false, 
        filterable: true
      }, {
        Header: 'spawngroup',
        accessor: 'spawngroup',
        sortable: false, 
        resizable: false, 
        filterable: true,
        Cell: row => {
          if (!row.value) {
            return null;
          } else {
            return (
              <div>
                <p>{row.value.name}</p>
                {
                  row.value.spawnentries
                    ? <ul>
                        {row.value.spawnentries.map(entry => {
                          return(
                            <li key={entry.npc_id}>
                              <a onClick={this.handleNPC} id={entry.npc_id}>
                                {entry.chance}% {entry.npc_name} ({entry.npc_level}{entry.npc_maxlevel ? `-${entry.npc_maxlevel}` : null})
                              </a>
                            </li>
                          )
                        })} 
                      </ul> 
                    : null
                }
              </div>
            )
          }
        }
      }]
    }];
 
    return (
      <div id="Spawns">
        <Row>
          <Col md={7}>
            <ReactTable
              data={this.props.spawnTree}
              columns={columns}
              defaultSorted={[
                {
                  id: "id",
                  desc: true
                }
              ]}
              filterable={false}
              className="-striped -highlight"
              style={{ height: 950, overflowY: "auto", fontSize: 12 }}
              showPagination={false}
              pageSize={this.props.spawnTree.length}
            />
          </Col>
          <Col md={17}>
            {
              this.props.mode
                ? this.props.mode !== 'spawn'
                    ? <NPCEditor npcID={this.props.id}/>
                    : <SpawnEditor zone={this.props.zone} spawn2ID={this.props.id}/>
                : null
            }
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Spawns);