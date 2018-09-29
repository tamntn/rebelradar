import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './views/App.jsx';
import registerServiceWorker from './registerServiceWorker';
import InfoDrawer from './views/InfoDrawer';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/drawer" component={InfoDrawer} />
            {/* <Route component={NotFound} /> */}
        </Switch>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
