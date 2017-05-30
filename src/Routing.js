import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Navigation from './Navigation';
import Login from './Login';
import Auth from './Auth';


const Routing = () => (
  <Router>
    <div>
      <Route path="/login" component={Login}/>
      <PrivateRoute path="/" component={Navigation}/>
    </div>
  </Router>
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isAuthenticated() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default Routing
