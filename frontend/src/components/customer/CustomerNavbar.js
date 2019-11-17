import React from 'react';
import {Link} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

class CustomerNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const activeLinkStyle = {
            color: "#f7f7f7"
        };

        let navLinks;
        if (this.props.activeLink === "reserve") {
            navLinks = <React.Fragment>
                <Nav.Link href="/reserve" style={activeLinkStyle}>Reserve</Nav.Link>
                <Nav.Link href="/vehicles"> Vehicles</Nav.Link>
            </React.Fragment>
        } else {
            navLinks = <React.Fragment>
                <Nav.Link href="/reserve">Reserve</Nav.Link>
                <Nav.Link href="/vehicles" style={activeLinkStyle}>Vehicles</Nav.Link>
            </React.Fragment>
        }
        return (
            <Navbar bg={"dark"} variant={"dark"}>
                <Navbar.Brand href="/">SuperRent</Navbar.Brand>
                <Nav className="mr-auto">
                    {navLinks}
                </Nav>
            </Navbar>
        )
    }
}

export default CustomerNavbar;
{/*<nav className="navbar navbar-expand-lg navbar-light bg-light">*/
}

{/*    <Link className="navbar-brand" to={"/"}>SuperRent</Link>*/
}
{/*    <button className="navbar-toggler" type="button" data-toggle="collapse"*/
}
{/*            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"*/
}
{/*            aria-label="Toggle navigation">*/
}
{/*        <span className="navbar-toggler-icon"></span>*/
}
{/*    </button>*/
}

{/*    <div className="collapse navbar-collapse" id="navbarSupportedContent">*/
}
{/*        <ul className="navbar-nav mr-auto">*/
}
{/*            <li className="nav-item active">*/
}
{/*                <a className="nav-link" href="/reserve">Reserve</a>*/
}
{/*            </li>*/
}
{/*            <li className="nav-item">*/
}
{/*                <a className="nav-link" href="/vehicles">Vehicles<span className="sr-only">(current)</span></a>*/
}
{/*            </li>*/
}
{/*        </ul>*/
}
{/*    </div>*/
}
{/*</nav>*/
}