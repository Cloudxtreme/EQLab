import React from 'react'
// import { NavLink, Route, Switch } from 'react-router-dom'
import { Grid, Row, Col, Button, Panel } from 'react-bootstrap'
import api from '../api.js'
import {
  AUTH_LOGIN
} from '../constants/actionTypes'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import Input from '../_EQLab/components/form/Input.jsx'
import './Auth.css'

const mapDispatchToProps = dispatch => ({
  logIn: (username, password) =>
    dispatch({ type: AUTH_LOGIN, payload: api.auth.logIn(username, password) }),
});

const LoginOptions = {
  form: 'Login'
}

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.submitLoginForm = (values, dispatch, props) => {
      return new Promise((resolve, reject) => {
        if (props.dirty && props.valid) {
          this.props.logIn(values.username, values.password);
        }
      });
    }
  }

  render() {
    return (
      <form id="Login" onSubmit={this.props.handleSubmit(this.submitLoginForm)}>
        <Grid fluid>
          <Row>
            <Col md={6} mdOffset={3} className="vertical-center">
              <Panel className="center-block">
                <Row>
                  <Col md={12}>
                  <Field 
                    component={Input} 
                    type="text" 
                    name="username" 
                    label="username"  
                    bsSize="sm" />
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                  <Field 
                    component={Input} 
                    type="password" 
                    name="password" 
                    label="password"  
                    bsSize="sm" />
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Button bsStyle="primary" className="center-block" type="submit">Log In</Button>
                  </Col>
                  <Col md={12}>
                    <a className="center-align">Register Here</a>
                  </Col>
                </Row>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </form>  
    );
  }
}

Login = reduxForm(LoginOptions)(Login)

Login = connect(null, mapDispatchToProps)(Login)

export default Login;