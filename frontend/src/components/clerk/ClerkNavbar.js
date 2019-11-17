import React from 'react';
import {Link} from "react-router-dom";

class ClerkNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to={"/"}>SuperRent</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Rent</a>
                        </li>
                        <li className="nav-item">
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Clerk
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="#">Customers</a>
                                <a className="dropdown-item" href="#">Rentals</a>
                                <a className="dropdown-item" href="#">Returns</a>
                                <a className="dropdown-item" href="#">Reservations</a>
                                <a className="dropdown-item" href="#">Vehicles</a>
                                <a className="dropdown-item" href="#">VehicleTypes</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }

}

export default ClerkNavbar;