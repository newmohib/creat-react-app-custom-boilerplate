import React from 'react';
import { Route, Switch ,useHistory} from 'react-router-dom';
import SignInSignUp from './SubRouters/signInSignUp';
import Users from './SubRouters/userSubRouter';

function HomeRoute() {
    const history=useHistory();
    let isLogin=true;
    return (
            <div className="container">
        <Switch>
            {!isLogin && <Route path="/"   render={() => <SignInSignUp />}></Route>}
            <Route path="/admin"  render={() => <Users />}></Route>
            <Route render={() => <div>Not Found</div>}></Route>
        </Switch>
            </div>
    );
}

export default HomeRoute;
