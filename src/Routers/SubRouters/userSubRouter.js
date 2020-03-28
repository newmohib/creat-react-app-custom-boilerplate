import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Users } from '../../Components/Contents';

function UsersRouter(props) {
    let historyObj = useHistory();
    let routChange = (value) => {
        historyObj.push(value)
    }
    return (
        <div className="row justify-content-center mt-5">
            <div className="col-12 col-md-12 col-xl-12 col-lg-12 col-sm-12">
                <div className="container custom_form mt-5">
                    <div className="row  mt-0 mr-n4 ml-n4 justify-content-center h3">All Users</div>
                    <div className="row  mt-0 mr-n4 ml-n4">
                        <div className="col-12">
                            <Route path="/admin/users" exact render={() => <Users />}></Route>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UsersRouter;
