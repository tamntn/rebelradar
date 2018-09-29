import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './views/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            {/* <Route path="/test" component={App} />
            <Route component={NotFound} /> */}
        </Switch>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
