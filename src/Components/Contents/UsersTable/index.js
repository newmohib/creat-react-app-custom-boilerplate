import React from 'react';
import { connect } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

let Users = (props) => {
    return (
        <div className="m-2">
            <table className="table table-hover table-bordered">
                <thead>
                    <tr className="" >
                        <th scope="col" >ID</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>Otto</td>
                        <td><button type="button" class="btn btn-primary">Primary</button></td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>fat</td>
                        <td><button type="button" class="btn btn-primary">Primary</button></td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td >Larry the Bird</td>
                        <td >Larry </td>
                        <td>twitter</td>
                        <td><button type="button" class="btn btn-primary">Primary</button></td>
                    </tr>
                </tbody>
            </table>

            <nav aria-label="Page navigation example ">
                <ul class="pagination justify-content-end ">
                    <li class="page-item disabled" ><a class="page-link" href="#">Previous</a></li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
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