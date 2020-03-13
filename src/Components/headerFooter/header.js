import React from 'react';
import { FaSignOutAlt } from "react-icons/fa";
import { NavLink,useHistory } from 'react-router-dom';

function Header() {
    return (
        <div className="container-fluid">
            <div class="row navbar navbar-expand-lg navbar-light bg-light p-2 shadow bg-light rounded">
                <div class="col-auto mr-auto float-left">
                    <div>
                        <a className="navbar-brand" href="#">Navbar</a>
                        <a className="navbar-brand" href="#">Home</a>
                    </div>
                </div>
                <div class="col-auto float-right">
                    <NavLink className="btn btn-outline-primary btn-sm" to="/signout"><span className="mr-2">Sign Out</span><span><FaSignOutAlt /></span></NavLink>
                </div>
            </div>
        </div>
    );
}

export default Header;
