import { reactLocalStorage as Storage } from 'reactjs-localstorage';
import Data from './Data';

const Auth = {
  user() {
    let user = Storage.get('_USER');
    if (user === null) {
      user = '{}';
    }
    return JSON.parse(user);
  },

  token() {
    return Storage.get('_TOKEN');
  },

  isAuthenticated(cb) {
    var token = this.token();
    if (token !== "undefined") {
      if (typeof cb === "function") {
        cb();
      }
      return true;
    }
    return false;
  },

  authenticate(state, cb) {
    Data.simplePost('/login', {
      email: state.email,
      password: state.password
    })
    .then(function (response) {
      if (response.data.success === true) {
        Storage.set('_TOKEN', response.data.token);
        Storage.setObject('_USER', response.data.data);
        if (typeof cb === "function") {
          cb();
        }
      } else {
        alert('Unable to login!');
      }
    });
  },

  signout(cb) {
    Storage.set('_TOKEN');
    Storage.setObject('_USER');
    if (typeof cb === "function") {
      cb();
    }
    return true;
  }
};

export default Auth;
