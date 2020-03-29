import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

let Users = (props) => {
    let [isDesplay, setIsDesplay] = useState(null);
    let viewDetails = (index) => {
        if (isDesplay === index) {
            setIsDesplay(null);
        } else {
            setIsDesplay(index);
        }
    };
    let testData = [{id: 1 , firstName: "Mohib",lastName:"Rahman",email:"mohib@gmail.com" }, {id: 2, firstName: "Mohib",lastName:"Rahman",email:"mohib@gmail.com" }, {id: 3 , firstName: "Mohib",lastName:"Rahman",email:"mohib@gmail.com" },{id: 4 , firstName: "Mohib",lastName:"Rahman",email:"mohib@gmail.com" },{id: 5 , firstName: "Mohib",lastName:"Rahman",email:"mohib@gmail.com" },];

    return (
        <div className="m-2">
            <div className="container-fluid border ">
                <div className="row text-center font-weight-bold border-bottom">
                    <div className="col">
                        <div className="border-right">
                            <div className=" p-2">
                                ID
                        </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="border-right">
                            <div className=" p-2">
                                First Name
                        </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="border-right">
                            <div className=" p-2">
                                Last Name
                        </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="border-right">
                            <div className=" p-2">
                                Email
                        </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="">
                            <div className=" p-2">
                                Action
                        </div>
                        </div>
                    </div>
                </div>
                {
                    testData.map((item, index) => {
                        let borderClass = testData.length - 1 !== index ||index===isDesplay ? "border-bottom" : ""
                        return (
                            <div >
                                <div className={`row text-center  ${borderClass}`}>
                                    <div className="col">
                                        <div className="border-right">
                                            <div className=" p-2">
                                                {item.id}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="border-right">
                                            <div className=" p-2">
                                                {item.firstName}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="border-right">
                                            <div className=" p-2">
                                                {item.lastName}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="border-right">
                                            <div className=" p-2">
                                                {item.email}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="">
                                            <div className="p-1">
                                                <button onClick={() => viewDetails(index)} type="button" className="btn btn-primary btn-sm">More Options</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    isDesplay === index && 
                                    <div className={`row border-bottom`}>
                                        <div className="col">
                                            Test
                                        </div>
                                    </div>
                                }
                            </div>
                        )
                    })
                }
            </div>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end mt-2">
                    <li className="page-item disabled" ><a className="page-link" href="#">Previous</a></li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
            </nav>
        </div>
    );
}
const mapStateToProps = state => ({
    //signinInfo: state.signin,
})

const mapDispatchToProps = dispatch => ({
    // handleSigninChange: (value) => dispatch(handleSigninChange(value)),
    // handleSigninSubmit: (value) => dispatch(handleSigninSubmit(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Users);