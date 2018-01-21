import React from 'react';
import { Row, Col, Panel, Tab, Nav, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  NPCAPP_LOAD,
  NPCAPP_UNLOAD
} from '../../constants/actionTypes';
import NPCSearch from './NPCSearch/NPCSearch.jsx';


const mapDispatchToProps = dispatch => ({
  load: () =>
    dispatch({ type: NPCAPP_LOAD }),
  unload: () =>
    dispatch({ type: NPCAPP_UNLOAD })
});

class NPCApp extends React.Component {

  componentDidMount() {
    this.props.load();
  }

  componentWillUnmount() {
    this.props.unload();
  }

  render() {
    return (
      <div id="NPCApp">
        <Tab.Container id="npc-panel-container" defaultActiveKey={"search"}>
          <Panel id="npc-panel" style={{ height: 1006 }}>
            <Panel.Heading style={{ padding: 0 }}>
              <Row id="npc-panel-header" style={{ height: 45 }}>
                <Col md={24}>
                  <Nav bsStyle="tabs" style={{ marginTop: 7, borderBottom: "none" }}>
                    <NavItem eventKey="search">Search</NavItem>
                    <NavItem eventKey="templates">Templates</NavItem>
                    <NavItem eventKey="spellsets">Spell Sets</NavItem>
                    <NavItem eventKey="passivesets">Passive Sets</NavItem>
                    <NavItem eventKey="loottables">Loot Tables</NavItem>
                    <NavItem eventKey="merchanttables">Merchant Tables</NavItem>
                    <NavItem eventKey="factions">Factions</NavItem>
                    <NavItem eventKey="emotes">Emotes</NavItem>
                    <NavItem eventKey="tintsets">Tint Sets</NavItem>
                  </Nav> 
                </Col>
              </Row>
            </Panel.Heading>
            <Panel.Body collapsible={false}>
              <Tab.Content animation={false} mountOnEnter={false} unmountOnExit={false}>
                <Tab.Pane eventKey="search">
                  <NPCSearch />
                </Tab.Pane>
                <Tab.Pane eventKey="templates">
                  <span>Templates</span>
                </Tab.Pane>
              </Tab.Content>
            </Panel.Body>
          </Panel>
        </Tab.Container>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(NPCApp);