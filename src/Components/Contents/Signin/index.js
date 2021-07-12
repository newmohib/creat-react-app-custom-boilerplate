import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { TextInput } from '../../Form';
import { formFieldName } from './signinForm';
import { handleSigninChange, handleSigninSubmit } from './action';
import { httpSimpleRequest } from '../../../Utils/httpClient';
import { setCookie, getCookie, deleteCookie } from '../../../Utils/cookies';
import { notifications } from '../Notifications';

let Signin = (props) => {
    let historyObj = useHistory();
    let routChange = (value) => {
        historyObj.push(value)
    };

    useEffect(
        () => {
            let loginToken = getCookie(process.env.REACT_APP_LOGIN_TOKEN_KEY)
            if (loginToken) {
                routChange(`/admin/users`);
            }
        }, []
    );

    let errorValue = { email: "", password: "" };
    let formValue = props.signinInfo;
    let handleChange = ({ currentTarget: input }) => {
        let formValue = props.signinInfo;

        let signinInfo = { ...formValue, [input.name]: input.value };
        props.handleSigninChange(signinInfo);
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
       // props.handleSigninSubmit(signinObj);
       //Signing in...
        let httpRequest = {
            method: "post",
            url: `${process.env.REACT_APP_API_HOST_URL}/login`,
            data: signinObj,
            headers: {
                'content-type':'application/json'
            }
        }

        httpSimpleRequest(httpRequest)
            .then(response => {
                console.log("response", response.data);
                if (response?.data?.isAuthorization) {
                   setCookie( process.env.REACT_APP_LOGIN_TOKEN_KEY, response.data.isAuthorization);
                   routChange(`/admin/users`);
                  
                }else{
                    let notifyOptions={
                        title: "Error",
                        message: response.data.error || "Incorrect username or password.",
                        type: "danger"
                    };
                    notifications(notifyOptions);  
                }

            }).catch(error => {
                console.log("error", error);
                let notifyOptions={
                    title: "Error",
                    message: "Incorrect username or password.",
                    type: "danger"
                };
                notifications(notifyOptions);  
            })
    }
    
    console.log("env", process.env.REACT_APP_NOT_SECRET_CODE);
    return (
        <div className="row justify-content-center mt-5">
            <div className="col-12 col-md-8 col-xl-5 col-lg-5 col-sm-10">
                <div className="container custom_form mt-5">
                    <div className="row mt-0 mr-n4 ml-n4">
                        <div className="col-12">
                            <div className="container">
                                <div className="row justify-content-center font-weight-bold h3 "><div className="col-12 mx-0  border-top-0 border-right-0 border-left-0  border-bottom text-center pb-2"> Sign In</div></div>
                                <form onSubmit={handleSubmit}>
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
                                    <div className="row mx-2 justify-content-center">
                                        <div className="col-12 float-right">
                                            <button type="submit" className="btn new_bnt_1 btn-block font-weight-bold ">Sign In</button>
                                        </div>
                                    </div>
                                    <div className="row m-2 ">
                                        <div className="col-12 col-md-6 mr-auto float-left">
                                            <div>
                                                <button onClick={() => routChange("/authe/signup")} className="btn btn-light  btn-block "><span className="">Forgot email?</span></button>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 float-right">
                                        <button onClick={() => routChange("/authe/signup")} className="btn btn-secondary btn-block"><span className="">Create an account</span></button>
                                        </div>
                                    </div>
                                </form>
                                <div className="row justify-content-center mt-4 ">
                                    <div className="col-12 mx-0 text-center font-weight-light pb-2">
                                        <NavLink className="mx-1 " to="/">Terms</NavLink>
                                        <NavLink className="mx-1 " to="/">Privacy</NavLink>
                                        <NavLink className="mx-1 " to="/">Security</NavLink>
                                        <NavLink className="mx-1 " to="/">Contact</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
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
    handleSigninChange: (value) => dispatch(handleSigninChange(value)),
    handleSigninSubmit: (value) => dispatch(handleSigninSubmit(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
