import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { Grid, Row, Col, Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Home from './Home/Home.jsx';
import ZoneApp from './ZoneApp/ZoneApp.jsx';


class EQLab extends React.Component {
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
              <LinkContainer to="/zone"><NavItem eventKey={1}>Zones</NavItem></LinkContainer>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1}>Log Out</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Grid fluid>
          <Row>
            <Col md={24}>
              <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/zone' component={ZoneApp}/>
              </Switch>
            </Col>
          </Row>
        </Grid>
      </div>  
    );
  }
}

export default EQLab;