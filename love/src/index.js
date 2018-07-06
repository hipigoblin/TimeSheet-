import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import Appi from './Appi';
import registerServiceWorker from './registerServiceWorker';
import Timesheet from './Timesheet'

ReactDOM.render(<Timesheet />, document.getElementById('root'));
registerServiceWorker();
