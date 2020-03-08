import React, { useState } from 'react';
import { TextInput } from '../../Form';
import { formFieldName } from './signinForm';

function Signin() {
    const [formValue, setformValue] = useState({ email: "", password: "" });
    let errorValue = { email: "", password: "" };
    let handleChange = ({ currentTarget: input }) => {
        // element.preventDefault();
        console.log("name : value", input.name, input.value);
        setformValue({ ...formValue, [input.name]: input.value });
    }
    return (
        <div className="row justify-content-center ">
            <div className="col-6">
                <div className="container custom_form mt-5">
                <div className="row justify-content-center font-weight-bold">Sign In</div>
                    <div className="row ">
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
                </div>
            </div>
        </div>
    );
}

export default Signin;
