import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { Grid, Row, Col, Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import {
  EQLAB_LOAD,
  EQLAB_UNLOAD
} from '../constants/actionTypes';
import Home from './Home/Home.jsx';
import ZoneApp from './ZoneApp/ZoneApp.jsx';
import NPCApp from './NPCApp/NPCApp.jsx';
import NoMatch from './Errors/NoMatch.jsx';


const mapDispatchToProps = dispatch => ({
  load: () =>
    dispatch({ type: EQLAB_LOAD }),
  unload: () =>
    dispatch({ type: EQLAB_UNLOAD })
});

class EQLab extends React.Component {

  componentDidMount() {
    this.props.load();
  }

  componentWillUnmount() {
    this.props.unload();
  }
  
  render() {
    return (
      <div id="EQLab">
        <Navbar default staticTop collapseOnSelect fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <NavLink to="/">EQLab</NavLink>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/zones"><NavItem eventKey={1}>Zones</NavItem></LinkContainer>
              <LinkContainer to="/npcs"><NavItem eventKey={1}>NPCs</NavItem></LinkContainer>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1}>Options</NavItem>
              <NavItem eventKey={2}>Log Out</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Grid fluid>
          <Row>
            <Col md={24}>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/zones' component={ZoneApp} />
                <Route exact path='/npcs' component={NPCApp} />
                <Route component={NoMatch}/>
              </Switch>
            </Col>
          </Row>
        </Grid>
      </div>  
    );
  }
}

export default connect(null, mapDispatchToProps)(EQLab);