import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

class CustomerNavbar extends React.Component {
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
}

export default CustomerNavbar;