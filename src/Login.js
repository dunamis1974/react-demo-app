import React, { Component } from 'react';
import { Well, Button, Panel, FormGroup, FormControl, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import Auth from './Auth';

import logo from './logo.svg';
import './css/Login.css';



class Login extends Component {
  state = {
    redirectToReferrer: false,
    email: "",
    password: ""
  }

  login = () => {
    Auth.authenticate(this.state, () => {
      this.setState({ redirectToReferrer: true })
    })
  }

  handleEmailChange = (e) => {
     this.setState({email: e.target.value});
  }

  handlePasswordChange = (e) => {
     this.setState({password: e.target.value});
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    if (from.pathname === "/login") {
      from.pathname = "/";
    }
    if (redirectToReferrer || Auth.isAuthenticated()) {
      return (
        <Redirect to={from}/>
      )
    }

    return (
      <Col xs={4} xsOffset={4}>
        <Panel id="login-panel">
          <img src={logo} alt="demo-logo" id="demo-logo" />
          <br />
          <p>Admin Pannel</p>
          <br />
          <form>
            <FormGroup>
              <FormControl id="email" bsSize="large" type="text" placeholder="Е-Мейл" value={this.state.email} onChange={this.handleEmailChange} />
            </FormGroup>
            <FormGroup>
              <FormControl id="password" bsSize="large" type="password" placeholder="Парола" value={this.state.password} onChange={this.handlePasswordChange} />
            </FormGroup>
            <Button bsStyle="primary" bsSize="large" block onClick={this.login}>Login</Button>
          </form>
          <br />
        </Panel>
        <Well>
          <b>To login use:</b><br/>
          Username: demo@demo.com<br/>
          Password: demo
        </Well>
      </Col>
    )
  }
}

export default Login;
