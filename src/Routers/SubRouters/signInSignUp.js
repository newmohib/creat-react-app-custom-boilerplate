import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import {
    Signin,
    Signup
} from '../../Components/Contents';

function SignInSignUp(props) {
    let historyObj=useHistory();
    let routChange=(value)=>{

historyObj.push(value)
    }
    return (
        <div className="row justify-content-center mt-5">
            <div className="col-6">
                <div className="container custom_form mt-5">
                    <div className="row">
                        <div className="col-12">
                            <div className="container m-0">
                                <div className="row m-2">
                                    <div className="col-12 ">
                                        <div class="btn-group btn-block btn-group-lg mx-auto" role="group" aria-label="Basic example">
                                            <button onClick={()=> routChange("/")} type="button" class="btn btn-primary ">Sign In</button>
                                            <button onClick={()=> routChange("/authe/signup")} type="button" class="btn btn-primary ">Sign Up</button>
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
