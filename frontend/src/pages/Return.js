import {Link} from "react-router-dom";
import React from 'react';

class Return extends React.Component {


    render() {
        return (
            <div>
                <div className="buttons">
                    <button><Link to="/vehicles">
                        Return Car
                    </Link>
                    </button>
                </div>

            </div>
        )
    }
}

export default Return;