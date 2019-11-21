import React from 'react';
import {Fade} from "react-bootstrap";

class ReturnTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const containerStyle = {
            margin: "50px",
            textAlign: "center"
        };

        return (
            <Fade appear={true} in={true}>
                <div style={containerStyle}>
                    <div>
                        <h2>Return Successful</h2>
                    </div>
                    <div className={"row"} style={{margin: "20px 0"}}>
                        <div className={"col-sm"} style={{textAlign: "right"}}>
                            <h5>Rent ID: </h5>
                            <h5>Return Date: </h5>
                            <h5>Return Time: </h5>
                            <h5>Full Tank: </h5>
                            <h5>Price: </h5>
                        </div>
                        <div className={"col-sm"} style={{textAlign: "left"}}>
                            <h5>{this.props.rentDetail.rid}</h5>
                            <h5>{this.props.rentDetail.date}</h5>
                            <h5>{this.props.rentDetail.time}</h5>
                            <h5>{this.props.rentDetail.fulltank ? "Yes" : "No"}</h5>
                            <h5>${this.props.rentDetail.value}</h5>
                        </div>
                    </div>
                </div>
            </Fade>
        )
    }
}


export default ReturnTable;
