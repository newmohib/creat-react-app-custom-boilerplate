import React from 'react';
import { Route, Switch ,useHistory} from 'react-router-dom';
import {
    Signin
} from '../Components/Contents';

function HomeRoute() {
    const history=useHistory();
    return (
            <div className="container">
        <Switch>
            <Route path="/" exact render={() => <Signin />}></Route>
            <Route render={() => <div>Not Found</div>}></Route>
        </Switch>
            </div>
    );
}

export default HomeRoute;
