import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { TextInput } from '../../Form';
import { formFieldName } from './signinForm';
import { handleSigninChange, handleSigninSubmit } from './action';

 let Signin=(props)=> {
    let errorValue = { email: "", password: "" };
    let formValue = props.signinInfo;
    let handleChange = ({ currentTarget: input }) => {
        let signinInfo = { name: input.name, value: input.value };
        props.handleSigninChange(signinInfo);
    };

    const handleSubmit = (element) => {
        element.preventDefault();
        let signinSubmitArr = element.target;
        let signinObj = {};
        for (let i = 0; i < signinSubmitArr.length - 1; i++) {
            const value = signinSubmitArr[i].value;
            const name = signinSubmitArr[i].name;
            signinObj[name] = value;
        };

        props.handleSigninSubmit(signinObj);
        setTimeout(() => {
            console.log("submit",props.signinInfo().signin);
        }, 1000)
    }
    return (
        // <div className="row justify-content-center mt-5">
        //     <div className="col-6">
        //         <div className="container custom_form mt-5">
                    <form onSubmit={handleSubmit}>
                        <div className="row mx-2 justify-content-center font-weight-bold h3">Sign Up</div>
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
                            <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                        </div>
                    </form>
        //         </div>
        //     </div>
        // </div>
    );
}
const mapStateToProps = state => ({
    signinInfo: state.signin,
})

const mapDispatchToProps = dispatch => ({
    handleSigninChange: (value) => dispatch(handleSigninChange(value)),
    handleSigninSubmit: (value) => dispatch(handleSigninSubmit(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
