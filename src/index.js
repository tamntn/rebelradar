import React from 'react';
import ReactDOM from 'react-dom';
import HttpsRedirect from 'react-https-redirect';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './views/App.jsx';
import registerServiceWorker from './registerServiceWorker';
import InfoDrawer from './views/InfoDrawer';
import './index.css';

ReactDOM.render(
    // <HttpsRedirect>
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/drawer" component={InfoDrawer} />
            {/* <Route component={NotFound} /> */}
        </Switch>
    </BrowserRouter>
    // </HttpsRedirect>
    , document.getElementById('root'));
registerServiceWorker();
