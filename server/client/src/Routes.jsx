import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import api from './api'
import Login from './Auth/Login.jsx'
import PrivateRoute from './Auth/PrivateRoute.jsx'
import EQLab from './_EQLab/EQLab.jsx'



class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: false
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      api.setToken(token);
      this.setState({ authed: true }, () => {
        console.log(this.state)
      })
    }
  }


  render() {
    return (
      <div id="Routes">
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Login} />
            <PrivateRoute authed={this.state.authed} path='/eqlab' component={EQLab} />
          </Switch>
        </BrowserRouter>
      </div>  
    );
  }
}

export default Routes;