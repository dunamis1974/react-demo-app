import Auth from './Auth';
import axios from 'axios';

const Data = {
  api: '/api',

  get: function (uri, params) {
    const url = this.api + uri;
    return axios.get(url, {
      params: params,
      headers: {
        'Authorization': 'TOKEN ' + Auth.token()
      }
    })
    .catch(function (error) {
      //alert(error.response.data.userMessage);
      console.log(error.response.data.message);
    })
  },

  post: function (uri, params) {
    const url = this.api + uri;
    return axios.post(url, params)
    .catch(function (error) {
      alert(error.response.data.userMessage);
    })
  },

  simplePost: function (uri, params) {
    const url = this.api + uri;
    return axios.post(url, params)
    .catch(function (error) {
      alert(error.response.data.userMessage);
    })
  }
};

export default Data;
