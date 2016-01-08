import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './components/main';
import About from './components/about';

import { Router, Route, Link, browserHistory } from 'react-router'

injectTapEventPlugin();

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/">
            <Route path="home" component={Main} />
            <Route path="about" component={About} />
        </Route>
    </Router>
), document.getElementById('app'));
