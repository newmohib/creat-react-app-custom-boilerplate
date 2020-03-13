import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import {
    Signin,
    Signup
} from '../../Components/Contents';

function SignInSignUp(props) {
    let historyObj = useHistory();
    let routChange = (value) => {
        historyObj.push(value)
    }
    return (
        <div className="row justify-content-center mt-5">
            <div className="col-12 col-md-8 col-xl-6 col-lg-6 col-sm-10">
                <div className="container custom_form mt-5">
                    <div className="row mt-0 mr-n4 ml-n4">
                        <div className="col-12">
                            <div className="container">
                                <div className="row mt-n2 mb-2 ml-n4 mr-n4">
                                    <div className="col-12 ">
                                        <div class="btn-group btn-block btn-group-lg mx-auto " role="group" aria-label="Basic example">
                                            <button onClick={() => routChange("/")} type="button" class="btn btn-outline-primary border-top-0 border-right-0 border-left-0  border-bottom">Sign In</button>
                                            <button onClick={() => routChange("/authe/signup")} type="button" class="btn btn-outline-primary border-top-0 border-right-0 border-left-0  border-bottom">Sign Up</button>
                                        </div>
                                    </div>
                                </div>
                                <Route path="/" exact render={() => <Signin />}></Route>
                                <Route path="/authe/signup" exact render={() => <Signup />}></Route>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignInSignUp;
