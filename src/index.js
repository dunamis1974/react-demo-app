import React from 'react';
import ReactDOM from 'react-dom';

import Routing from './Routing'
import registerServiceWorker from './registerServiceWorker';

import './css/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

ReactDOM.render(<Routing />, document.getElementById('body'));

registerServiceWorker();
