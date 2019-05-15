import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/home';

export const AppRouter = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route render={() => (<h1>404: This is not the page you are looking for</h1>)} />
    </Switch>
);