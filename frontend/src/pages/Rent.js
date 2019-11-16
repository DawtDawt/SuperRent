import {Link} from "react-router-dom";
import React from 'react';

class Rent extends React.Component {


    render() {
        return (
            <div>
                <div className="buttons">
                    <button><Link to="/vehicles">
                        Generate receipt
                    </Link>
                    </button>
                </div>

            </div>
        )
    }
}

export default Rent;