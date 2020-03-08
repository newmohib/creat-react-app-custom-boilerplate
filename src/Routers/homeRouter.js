import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import {
    Signin
} from '../Components/Contents';

function HomeRoute() {
    return (
            <div className="container">
        <Switch>
            <Route path="/" exact render={() => <Signin />}></Route>
        </Switch>
            </div>
    );
}

export default HomeRoute;
