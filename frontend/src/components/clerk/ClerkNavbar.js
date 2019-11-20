import React from 'react';
import {Link} from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

class ClerkNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Navbar bg={"dark"} variant={"dark"}>
                <Navbar.Brand href="/">SuperRent</Navbar.Brand>
                <Nav className="mr-auto">
                </Nav>
            </Navbar>
        )
    }



    // render() {
    //     return (
    //         <nav className="navbar navbar-expand-lg navbar-light bg-light">
    //             <Link className="navbar-brand" to={"/"}>SuperRent</Link>
    //             <button className="navbar-toggler" type="button" data-toggle="collapse"
    //                     data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
    //                     aria-expanded="false"
    //                     aria-label="Toggle navigation">
    //                 <span className="navbar-toggler-icon"></span>
    //             </button>
    //
    //             <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //                 <ul className="navbar-nav mr-auto">
    //                     <li className="nav-item">
    //                         <a className="nav-link" href="/Rent">Rent</a>
    //                     </li>
    //                     <li className="nav-item">
    //                         <a className="nav-link" href="/Return">Return</a>
    //                     </li>
    //                     <li className="nav-item">
    //                         <a className="nav-link" href="#">Report</a>
    //                     </li>
    //                 </ul>
    //             </div>
    //         </nav>
    //     )
    // }

}

export default ClerkNavbar;