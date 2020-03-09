import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { TextInput } from '../../Form';
import { formFieldName } from './signinForm';
import { handleSigninChange } from './action';

function Signin(props) {
    let errorValue = { email: "", password: "" };
    let formValue = props.signinInfo;

    let handleChange = ({ currentTarget: input }) => {
        let signinInfo = {name: input.name,value: input.value};
        props.handleSigninChange(signinInfo);
    };
    const handleSubmit=(element)=>{
         element.preventDefault();
         console.log("test",props.signinInfo);
    }
    return (
        <div className="row justify-content-center mt-5">
            <div className="col-6">
                <div className="container custom_form mt-5">
                    <div className="row mx-2 justify-content-center font-weight-bold h3">Sign In</div>
                    <div className="row mx-2">
                        {
                            formFieldName.map((item, itemIndex) => {
                                return <TextInput
                                    key={itemIndex}
                                    {...item}
                                    value={formValue[item.valueName]}
                                    error={errorValue[item.errorName]}
                                    onChange={handleChange}
                                />
                            })
                        }
                    </div>
                    <div className="row mx-2 justify-content-center font-weight-bold">
                        <button onClick={handleSubmit} type="button" className="btn btn-primary btn-lg">Sign In</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = state => ({
    signinInfo: state.signin,
})

const mapDispatchToProps = dispatch => ({
    handleSigninChange: (value) => dispatch(handleSigninChange(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
