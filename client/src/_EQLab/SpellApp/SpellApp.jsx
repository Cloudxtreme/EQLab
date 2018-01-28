import React from 'react';
import { Row, Col, Panel, Tab, Nav, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  SPELLAPP_LOAD,
  SPELLAPP_UNLOAD
} from '../../constants/actionTypes';
import SpellSearch from './SpellSearch/SpellSearch.jsx';


const mapDispatchToProps = dispatch => ({
  load: () =>
    dispatch({ type: SPELLAPP_LOAD }),
  unload: () =>
    dispatch({ type: SPELLAPP_UNLOAD })
});

class SpellApp extends React.Component {

  componentDidMount() {
    this.props.load();
  }

  componentWillUnmount() {
    this.props.unload();
  }

  render() {
    return (
      <div id="SpellApp">
        <Tab.Container id="spell-panel-container" defaultActiveKey="search">
          <Panel id="spell-panel" style={{ height: 1006 }}>
            <Panel.Heading style={{ padding: 0 }}>
              <Row id="spell-panel-header" style={{ height: 45 }}>
                <Col md={24}>
                  <Nav bsStyle="tabs" style={{ marginTop: 7, borderBottom: "none" }}>
                    <NavItem eventKey="search">Search</NavItem>
                    <NavItem eventKey="create">Create</NavItem>
                  </Nav> 
                </Col>
              </Row>
            </Panel.Heading>
            <Panel.Body collapsible={false}>
              <Tab.Content animation={false} mountOnEnter={false} unmountOnExit={false}>
                <Tab.Pane eventKey="search">
                  <SpellSearch />
                </Tab.Pane>
                <Tab.Pane eventKey="create">
                  Create
                  {/* <SpellCreate /> */}
                </Tab.Pane>
              </Tab.Content>
            </Panel.Body>
          </Panel>
        </Tab.Container>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(SpellApp);