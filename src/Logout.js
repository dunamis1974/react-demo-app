import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import Auth from './Auth';

class Logout extends Component {
  state = {
    doRedirect: false,
  }
  render() {
    Auth.signout();
    return (
      <Redirect to={{
        pathname: '/login',
        state: { from: '/' }
      }}/>
    )
  }
}

export default Logout
