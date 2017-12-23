import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import api from '../../../api.js'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import FontAwesome from 'react-fontawesome'
import SpawnEditor from '../../components/SpawnEditor/SpawnEditor.jsx'
import NPCEditor from '../../components/NPCEditor/NPCEditor.jsx'

const mapStateToProps = state => ({
  zone: state.zoneApp.zone,
  spawnTree: state.zoneApp.spawnTree
});

class Spawns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: '',
      id: null
    }

    this.newSpawn2 = async () => {
      if (this.props.zone) {
        api.zone.postSpawn2(this.props.zone);
      }
    }

    this.handleSpawn = (e) => {
      let id = e.target.id

      if (this.state.mode !== 'spawn') {
        this.setState({ mode: 'spawn', id })
      } else if (id !== this.state.id) {
        this.setState({ id })
      }
    }

    this.handleNPC = (e) => {
      let id = e.target.id

      if (this.state.mode !== 'npc') {
        this.setState({ mode: 'npc', id })
      } else if (id !== this.state.id) {
        this.setState({ id })        
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.zone && nextProps.zone !== this.props.zone) {
      this.setState({ mode: '', id: null });
    } else if (!nextProps.zone && nextProps.zone !== this.props.zone) {
      this.setState({ mode: '', id: null })
    }
  }

  componentDidUpdate() {
    console.log('spawns update')
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
              style={{ height: 893, overFlowY: "auto", fontSize: 12 }}
              showPagination={false}
              pageSize={this.props.spawnTree.length}
            />
          </Col>
          <Col md={17}>
            {
              this.state.mode
                ? this.state.mode !== 'spawn'
                    ? <NPCEditor npcID={this.state.id}/>
                    : <SpawnEditor zone={this.props.zone} spawn2ID={this.state.id}/>
                : null
            }
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Spawns);