import React, { Component } from 'react';
import { Button, Panel, Table, PageHeader, Glyphicon } from 'react-bootstrap';
import Data from './Data';

class People extends Component {
  currentPage = 0
  maxPerPage = 10

  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  componentDidMount() {
    Data.get('/user', { page: this.currentPage, size: this.maxPerPage })
      .then(res => {
        if (res !== undefined) {
          this.setState({ users: res.data });
        }
      });
  }

  viewHandler = (id) => {
    alert('Go to user: ' + id);
  }

  deleteHandler = (id) => {
    alert('Delete user: ' + id);
  }

  calcAge = (birthDate) => {
    var yearOfBirthday = birthDate.split('/')[2],
      currentDate = new Date(),
      currentYear = currentDate.getFullYear(),
      currentAge = (currentYear - yearOfBirthday);

    return currentAge;
  }

  render() {
    return (
      <Panel>
        <PageHeader>People<br/><small>List of all registered users.</small></PageHeader>
        <Panel>
          <Table responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Birth Date</th>
                <th>Age</th>
                <th>City</th>
                <th>Email</th>
                <th>Phone</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
            {this.state.users.map(user =>
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.birthDate}</td>
                <td>{this.calcAge(user.birthDate)}</td>
                <td>{user.city}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>
                  <Button onClick={() => this.viewHandler(user.id)} bsStyle="link"><Glyphicon glyph="user" /></Button>
                  <Button onClick={() => this.deleteHandler(user.id)} bsStyle="link"><Glyphicon glyph="remove" /></Button>
                </td>
              </tr>
            )}
            </tbody>
          </Table>
        </Panel>
      </Panel>
    );
  }
}

export default People;
