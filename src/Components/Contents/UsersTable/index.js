import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

let Users = (props) => {
    let [isDesplay, setIsDesplay] = useState(false)
    let viewDetails = () => {
        setIsDesplay(true);
    }
    let testData = [{ name: "Mohib", id: 1 }, { name: "Mohibur ", id: 2 }, { name: "Rahman", id: 3 },];


    return (
        <div className="m-2">
            <table className="table table-hover table-bordered text-center">
                <thead>
                    <tr >
                        <th scope="col">ID</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        testData.map((item, index) => {
                            console.log(item, index);
                           return( <tr>
                                <th scope="row">{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.name}</td>
                                <td>{item.name}</td>
                                <td><button onClick={() => viewDetails()} type="button" className="btn btn-primary">Primary</button></td>
                               
                            </tr>
                            
                            )
                        })  
                    }
                    {/* {isDesplay && <tr><td colspan="5">Details</td></tr>} */}

                </tbody>
            </table>

            <nav aria-label="Page navigation example ">
                <ul className="pagination justify-content-end ">
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