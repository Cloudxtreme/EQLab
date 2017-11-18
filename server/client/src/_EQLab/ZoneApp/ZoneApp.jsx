import React from 'react'
import { Row, Col, Panel, Tab, Nav, NavItem } from 'react-bootstrap'
import Select from 'react-select'
// import { Redirect, Route, Switch } from 'react-router-dom'
// import { LinkContainer } from 'react-router-bootstrap'
import api from '../../api.js'
import { socketConnect } from 'socket.io-react'
import { connect } from 'react-redux'
import {
  SUBAPP_UNLOAD,
  ZONEAPP_SELECT_ZONE,
  ZONEAPP_POST_SPAWN2
} from '../../constants/actionTypes'

import Spawns from './Spawns/Spawns.jsx'
// import Loot from './Loot/Loot.jsx'

const mapStateToProps = state => ({
  zone: state.zoneApp.zone
});

const mapDispatchToProps = dispatch => ({
  onUnload: () =>
    dispatch({ type: SUBAPP_UNLOAD }),
  selectZone: zone =>
    dispatch({ type: ZONEAPP_SELECT_ZONE, zone }),
  addSpawn2ToState: data =>
    dispatch({ type: ZONEAPP_POST_SPAWN2, data })
});

class ZoneApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoneList: [],
      pane: 'spawns'
    }

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
      this.setState({ pane: pane ? pane : 'spawns' })
    }
  }

  async componentWillMount() {
    let zoneList = await api.zone.getZoneList();
    this.setState({ zoneList })
  }

  componentDidMount() {
    this.props.socket.emit('ZoneApp Loaded');
  }

  componentWillUnmount() {
    this.props.socket.emit('ZoneApp Unloaded');
    this.props.onUnload();
  }

  render() {
    let options;
    this.state.zoneList
      ? options = this.state.zoneList.map(zone => {
          return {
            short_name: zone.short_name,
            label: `${zone.short_name} - ${zone.long_name} (${zone.zoneidnumber})`
          }
        })
      : options = [];

    return (
      <div id="Zone">
        <Tab.Container id="zone-panel" activeKey={this.state.pane} onSelect={this.onSelectPane}>
          <Panel header={
            <Row id="zone-panel-header">
              <Col md={8}>
              <div className="form-group">
              <Select
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
                />
              </div>
              </Col>
              <Col md={8}>
                <Nav bsStyle="tabs">
                  <NavItem eventKey="spawns">Spawns</NavItem>
                  <NavItem eventKey="loot">Loot</NavItem>
                </Nav> 
              </Col>
              <Col md={8}>
              </Col>
            </Row>
          }>
            <Tab.Content animation={false} mountOnEnter={false} unmountOnExit={false}>
              <Tab.Pane eventKey="spawns">
                <Spawns />
              </Tab.Pane>
              <Tab.Pane eventKey="loot">
                {/* <Loot /> */}
              </Tab.Pane>
            </Tab.Content>
          </Panel>
        </Tab.Container>
      </div>
    );
  }
}

ZoneApp = socketConnect(ZoneApp)

export default connect(mapStateToProps, mapDispatchToProps)(ZoneApp);