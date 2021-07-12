import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { TextInput } from '../../Form';
import { formFieldName } from './signupForm';
import { handleSignupChange, handleSignupSubmit } from './action';
import { handleChangeInput } from './service';
import { httpSimpleRequest } from '../../../Utils/httpClient';
import { notifications } from '../Notifications';

let Signup = (props) => {
    let historyObj = useHistory();
    let routChange = (value) => {
        historyObj.push(value)
    };

    let errorValue = { firstName: "", lastName: "", username: "", email: "", password: "", confPassword: "" };
    let formValue = props.signUpInfo;
    let handleChange = ({ currentTarget: input }) => {
        formValue = handleChangeInput(input, props);
    };
    let fileSelectHandler = (event) => {
        let value = event.target.files[0];
        let name = event.target.name;
        formValue = handleChangeInput({ name: name, value: value }, props);
    }
    const uploadProgress = (progressEvent) => {
        console.log('Upload Progress ' + (progressEvent.loaded / progressEvent.total * 100) + '%');
    }
    const handleSubmit = (element) => {
        element.preventDefault();

        // for all form data by submit
        // let signinSubmitArr = element.target;
        // console.log("signinSubmitArr", element.target.value);

        let fd = new FormData();
        let keys = Object.keys(formValue);

        keys.map((item, index) => {
            fd.append(item, formValue[item]);
        });

        let notifyOptions={
            title: "Error",
            message: "Incorrect Input & Please Try Again.",
            type: "danger"
        };
        // 'content-type':'application/json'
        
        // axios({
        //     method: "post",
        //     url: "http://localhost:4000/employees/img-upload",
        //     data: fd,
        //     onUploadProgress: uploadProgress,
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // })

        axios({
            method: "post",
            url: "http://localhost:4000/signup",
            data: formValue,
            onUploadProgress: uploadProgress,
            headers: {
                'content-type':'application/json'
            }
        })
        .then(response => {
            console.log("response", response.data);
            if (response?.data?.userId) {
                routChange("signin");
            }else{
                notifications(notifyOptions);  
            }
        }).catch(error => {
            console.log("error", error);
            notifications(notifyOptions); 
        });
    }

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-12 col-md-10 col-xl-6 col-lg-6 col-sm-10">
                <div className="container-fluid custom_form mt-5">
                    <div className="row mt-0 mr-n4 ml-n4">
                        <div className="col-12">
                            <div className="container-fluid">
                                {/* <div className="row mt-n2 mb-2 ml-n4 mr-n4">
                                    <div className="col-12 ">
                                        <div className="btn-group btn-block btn-group-lg mx-auto " role="group" aria-label="Basic example">
                                            <button onClick={() => routChange("/")} type="button" className="btn btn-outline-primary border-top-0 border-right-0 border-left-0  border-bottom">Sign In</button>
                                            <button onClick={() => routChange("/authe/signup")} type="button" className="btn btn-outline-primary border-top-0 border-right-0 border-left-0  border-bottom">Sign Up</button>
                                        </div>
                                    </div>
                                </div> */}
                                <div className="row justify-content-center font-weight-bold h3 "><div className="col-12 mx-0  border-top-0 border-right-0 border-left-0  border-bottom text-center pb-2">Sign Up</div></div>
                                <form onSubmit={handleSubmit} encType="multipart/form-data" >
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
                                        {/* <div className="form-group col-md-12">
                                            <div className="custom-file">
                                                <input
                                                    // multiple 
                                                    onChange={fileSelectHandler} name="image" type="file" className="custom-file-input" id="image" />
                                                <label className="custom-file-label" htmlFor="image">
                                                    {formValue.image.name ? formValue.image.name : "Choose Image"}
                                                </label>
                                            </div>
                                        </div> */}
                                    </div>

                                    <div className="row mx-2 mb-3 justify-content-center font-weight-bold">
                                        <button type="submit" className="btn  new_bnt_1 btn-block mx-3">Sign Up</button>
                                    </div>
                                </form>
                                {/* <div className="row m-2 ">
                                    <div className="col-12 col-md-6 ml-auto float-right mt-2">
                                        <button onClick={() => routChange("/")} className="btn btn-secondary btn-block"><span className="">Sign In</span></button>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
