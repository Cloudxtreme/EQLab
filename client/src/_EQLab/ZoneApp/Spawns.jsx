import React from 'react';
import { Row, Col, Button, Checkbox } from 'react-bootstrap';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import FontAwesome from 'react-fontawesome';
import {
  ZONEAPP_SPAWNS_SET_MODE, 
  ZONEAPP_SPAWNS_POST_SPAWN2
} from '../../constants/actionTypes';
import SpawnEditor from '../components/SpawnEditor/SpawnEditor.jsx';
import NPCEditor from '../components/NPCEditor/NPCEditor.jsx';

const mapStateToProps = state => ({
  spawnTree: state.ZoneApp.spawnTree,
  mode: state.ZoneApp.spawnsMode,
  id: state.ZoneApp.spawnsID
});

const mapDispatchToProps = dispatch => ({
  setMode: (mode, spawnsID) =>
    dispatch({ type: ZONEAPP_SPAWNS_SET_MODE, mode, spawnsID }),
  postSpawn2: (zone) =>
    dispatch({ type: ZONEAPP_SPAWNS_POST_SPAWN2, zone })
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
        this.props.setMode('spawn', parseInt(id, 10));
      }
    }

    this.handleNPC = (e) => {
      let id = e.target.id;

      if (this.props.mode !== 'npc' || (this.props.mode === 'npc' && id !== this.props.id)) {
        this.props.setMode('npc', parseInt(id, 10));
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
        Header: 'Spawn2',
        accessor: 'id',
        width: 80,
        sortable: true,
        resizable: false, 
        filterable: true,
        Cell: row => { 
          return <a onClick={this.handleSpawn} key={row.value} id={row.value}>{row.value}</a>
        }
      }, {
        Header: 'Version',
        accessor: 'version',
        width: 50,
        sortable: true, 
        resizable: false, 
        filterable: true,
        style: { textAlign: "center" }
      }, {
        Header: 'Enabled',
        accessor: 'enabled',
        width: 100,
        style: { textAlign: "center" },
        sortable: true, 
        resizable: false, 
        filterable: true,
        filterMethod: (filter, row) => {
          if (filter.value === "all") {
            return true;
          }
          if (filter.value === "1") {
            return row.enabled === 1;
          }
          return row.enabled !== 1;
        },
        Filter: ({ filter, onChange }) => {
          return (
            <select
              onChange={event => onChange(event.target.value)}
              style={{ width: "100%" }}
              value={filter ? filter.value : "all"}
            >
              <option value="all">Show All</option>
              <option value="1">Enabled</option>
              <option value="0">Disabled</option>
            </select>
          );
        },
        Cell: row => <Checkbox disabled={true} checked={row.value ? true : false} style={{ margin: 0 }}/>
      }, {
        Header: 'Spawngroup',
        accessor: 'spawngroup',
        sortable: false, 
        resizable: false, 
        filterable: true,
        filterMethod: (filter, row) => {
          if (row.spawngroup) {
            return row.spawngroup.name.toLowerCase().includes(filter.value.toLowerCase());
          } else if (row.spawngroup && row.spawngroup.spawnentries) {
            return row.spawngroup.spawnentries.some(npc => npc.npc_name.toLowerCase().includes(filter.value.toLowerCase()));
          } else {
            return false;
          }
        },
        Cell: row => {
          if (!row.value) {
            return null;
          } else if (!row.value.spawnentries) {
            return <center><strong>{row.value.name}</strong></center>
          } else {
            return (
              <table style={{ tableLayout: "fixed", width: "100%", float: "right" }}>
                <thead>
                  <tr>
                    <th colSpan="3" style={{ borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: "black", textAlign: "center" }}>{row.value.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    row.value.spawnentries.map(entry => {
                      return (
                        <tr key={entry.npc_id}>
                          <td style={{ width: 30, textAlign: "left" }}>{entry.chance}%</td>
                          <td style={{ textAlign: "left" }}><a onClick={this.handleNPC} id={entry.npc_id}>{entry.npc_name}</a></td>
                          <td style={{ textAlign: "right" }}>{entry.npc_level}{entry.npc_maxlevel ? `-${entry.npc_maxlevel}` : null}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
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
              style={{ height: 945, overflowY: "auto", fontSize: 12 }}
              showPagination={false}
              pageSize={this.props.spawnTree.length}
            />
          </Col>
          <Col md={17}>
            {
              this.props.mode
                ? this.props.mode !== 'spawn'
                    ? <NPCEditor npcID={this.props.id} />
                    : <SpawnEditor spawn2ID={this.props.id} />
                : null
            }
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Spawns);