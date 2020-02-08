import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

import './styles/global.scss';
import 'animate.css/animate.min.css';
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';

const Root = () => (
    <Router>
        <App />
    </Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));
