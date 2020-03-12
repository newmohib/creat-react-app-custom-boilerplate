import React from 'react';
import { Route, Switch ,useHistory} from 'react-router-dom';
import SignInSignUp from './SubRouters/signInSignUp';

function HomeRoute() {
    const history=useHistory();
    return (
            <div className="container">
        <Switch>
            <Route path="/"  render={() => <SignInSignUp />}></Route>
            <Route render={() => <div>Not Found</div>}></Route>
        </Switch>
            </div>
    );
}

export default HomeRoute;
