import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { TextInput } from '../../Form';
import { formFieldName } from './signupForm';
import { handleSignupChange, handleSignupSubmit } from './action';

let Signup = (props) => {
    let errorValue = { email: "", password: "", confPassword: "" };
    let formValue = props.signUpInfo;
    
    let handleChange = ({ currentTarget: input }) => {

        formValue = props.signUpInfo;
        console.log("input", formValue);
        let signUpInfo = { ...formValue, [input.name]: input.value };
        props.handleSignupChange(signUpInfo);

    };

    const handleSubmit = (element) => {
        element.preventDefault();
        let signinSubmitArr = element.target;
        let signinObj = {};
        for (let i = 0; i < signinSubmitArr.length; i++) {
            const value = signinSubmitArr[i].value;
            const name = signinSubmitArr[i].name;
            if (name !== "") { signinObj[name] = value; }
        };
        props.handleSignupSubmit(signinObj);
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
    signUpInfo: state.signup,
})

const mapDispatchToProps = dispatch => ({
    handleSignupChange: (value) => dispatch(handleSignupChange(value)),
    handleSignupSubmit: (value) => dispatch(handleSignupSubmit(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
