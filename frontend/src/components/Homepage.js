import React from 'react';
import {Link} from "react-router-dom";

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {vehicles: []};
    }

    render() {
        const btnStyle = {
            margin: "10px",
            width: "120px"
        };

        return (
            <div className="wrapper">
                <div>
                    <h1>I am a...</h1>
                </div>
                <div>
                    <Link to="/reserve">
                        <button className={`btn btn-primary btn-lg`} style={btnStyle}>Customer</button>
                    </Link>
                    <Link to="/rent">
                        <button className={`btn btn-primary btn-lg`} style={btnStyle}>Clerk</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Homepage;
