import React, { Component } from 'react';
import { Nav, Navbar, NavItem, Glyphicon } from 'react-bootstrap';

import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

import App from './App';
import People from './People';
import Auth from './Auth';

import logo from './logo.svg';
import './css/Navigation.css';

class Navigation extends Component {
  state = {
    loggedOut: false
  }

  logoutHandler = (e) => {
    Auth.signout(() => {
      this.setState({ loggedOut: true })
    });
  }

  render() {
    if (!Auth.isAuthenticated()) {
      return (
        <Redirect to={{
          pathname: '/login',
          state: { from: '/' }
        }}/>
      );
    } else {
      return (
        <Router>
          <div>
            <Navbar inverse fixedTop>
              <Navbar.Brand>
                <Link to="/"><img src={logo} className="nav-logo" alt="logo" /></Link>
              </Navbar.Brand>
              <Nav pullRight>
                <li><Link to="/people"><Glyphicon glyph="list" /> People</Link></li>
                <li><Link to="/settings"><Glyphicon glyph="cog" /> Settings</Link></li>
                <NavItem onClick={this.logoutHandler}><Glyphicon glyph="log-out" /> Logout</NavItem>
                <NavItem className="divider-vertical"></NavItem>
                <li><Link to="#profile"><Glyphicon glyph="user" /> {Auth.user().name}</Link></li>
              </Nav>
            </Navbar>
            <div id="content-body">
              <PrivateRoute exact path="/" component={App}/>
              <PrivateRoute exact path="/people" component={People}/>
            </div>
          </div>
        </Router>
      );
    }
  }
};

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
);

export default Navigation;
