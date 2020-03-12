import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
    Signin,
    Signup
} from '../../Components/Contents';

function SignInSignUp(props) {
    console.log("props signin sigup",props);
    return (
        <div className="row justify-content-center mt-5">
            <div className="col-6">
                <div className="container custom_form mt-5">
                    <div className="row">
                        <div className="col-12">
                            <div className="container m-0">
                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" class="btn btn-secondary">Left</button>
                                    <button type="button" class="btn btn-secondary">Middle</button>
                                    <button type="button" class="btn btn-secondary">Right</button>
                                </div>
                                
                                

                                <Route path="/authe/signin" exact  render={() => <Signin />}></Route>
                                <Route path="/authe/signup" exact  render={() => <Signup />}></Route>
                                
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignInSignUp;
