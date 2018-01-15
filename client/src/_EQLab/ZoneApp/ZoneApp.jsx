import React from 'react';
import { Row, Col, Panel, Tab, Nav, NavItem } from 'react-bootstrap';
import Select from 'react-select';
// import { Redirect, Route, Switch } from 'react-router-dom';
// import { LinkContainer } from 'react-router-bootstrap';
import { socketConnect } from 'socket.io-react';
import { connect } from 'react-redux';
import {
  ZONEAPP_LOAD,
  ZONEAPP_UNLOAD,
  ZONEAPP_SELECT_ZONE,
  ZONEAPP_SELECT_PANE,
  ZONEAPP_ADD_SPAWN2
} from '../../constants/actionTypes';
import Spawns from './Spawns/Spawns.jsx';
// import Loot from './Loot/Loot.jsx';


const mapStateToProps = state => ({
  zone: state.ZoneApp.zone,
  zoneList: state.ZoneApp.zoneList,
  pane: state.ZoneApp.pane,
  spawnTree: state.ZoneApp.spawnTree
});

const mapDispatchToProps = dispatch => ({
  load: () =>
    dispatch({ type: ZONEAPP_LOAD }),
  unload: () =>
    dispatch({ type: ZONEAPP_UNLOAD }),
  selectZone: zone =>
    dispatch({ type: ZONEAPP_SELECT_ZONE, zone }),
  selectPane: pane =>
    dispatch({ type: ZONEAPP_SELECT_PANE, pane }),
  addSpawn2ToState: data =>
    dispatch({ type: ZONEAPP_ADD_SPAWN2, data })
});

class ZoneApp extends React.Component {
  constructor(props) {
    super(props);

    this.props.socket.on('spawn2insert', data => {
      if (data.zone === this.props.zone) {
        this.props.addSpawn2ToState(data);
      }
    });

    this.onSelectZone = zone => {
      if (zone) {
        if (zone.short_name !== this.props.zone) {
          this.props.selectZone(zone.short_name);
        } 
      } else {
        if (this.props.zone) {
          this.props.selectZone(null);
        }
      }
    }

    this.onSelectPane = pane => {
      this.props.selectPane(pane);
    }
  }

  componentDidMount() {
    this.props.load();
    this.props.socket.emit('ZoneApp Loaded');
  }

  componentWillUnmount() {
    this.props.socket.emit('ZoneApp Unloaded');
    this.props.unload();
  }

  render() {
    let options;
    this.props.zoneList.length
      ? options = this.props.zoneList.map(zone => {
          return {
            short_name: zone.short_name,
            label: `${zone.short_name} - ${zone.long_name} (${zone.zoneidnumber})`
          }
        })
      : options = [];

    return (
      <div id="Zone">
        <Tab.Container id="zone-panel-container" activeKey={this.props.pane} onSelect={this.onSelectPane}>
          <Panel id="zone-panel" style={{ height: 1006 }}>
            <Panel.Heading style={{ padding: 0 }}>
              <Row id="zone-panel-header" style={{ height: 45 }}>
                <Col md={8}>
                  <Select
                    id="zone-select"
                    name="selectzone"
                    className="input-sm"
                    placeholder="Select a Zone"
                    clearable={true}
                    resetValue=""
                    valueKey="short_name"
                    labelKey="label"
                    value={this.props.zone}
                    options={options}
                    onChange={this.onSelectZone}
                    style={{ fontSize: 12, borderRadius: 0}}
                  />
                </Col>
                <Col md={8}>
                {
                  !this.props.zone
                    ? null
                    : <Nav bsStyle="tabs" style={{ marginTop: 7, borderBottom: "none" }}>
                        <NavItem eventKey="spawns">Spawns</NavItem>
                        <NavItem eventKey="loot">Loot</NavItem>
                      </Nav> 
                }
                </Col>
                <Col md={8}>
                </Col>
              </Row>
            </Panel.Heading>
            <Panel.Body collapsible={false}>
              <Tab.Content animation={false} mountOnEnter={false} unmountOnExit={false}>
                <Tab.Pane eventKey="spawns">
                  <Spawns 
                    zone={this.props.zone}
                    spawnTree={this.props.spawnTree}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="loot">
                  {/* <Loot /> */}
                </Tab.Pane>
              </Tab.Content>
            </Panel.Body>
          </Panel>
        </Tab.Container>
      </div>
    );
  }
}

ZoneApp = socketConnect(ZoneApp)

export default connect(mapStateToProps, mapDispatchToProps)(ZoneApp);