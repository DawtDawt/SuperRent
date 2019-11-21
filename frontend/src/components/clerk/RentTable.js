import React from 'react';
import {Fade} from "react-bootstrap";

class RentTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicleTypes: ['Economy', 'Compact', 'Mid-size', 'Standard', 'Full-size', 'SUV', 'Truck'],
        };
    }

    render() {
        const containerStyle = {
            margin: "50px",
            textAlign: "center"
        };

        return (
            <Fade in={true} appear={true}>
                <div style={containerStyle}>
                    <div>
                        <h2>Rent Successful</h2>
                    </div>
                    <div className={"row"} style={{margin: "20px 0"}}>
                        <div className={"col-sm"} style={{textAlign: "right"}}>
                            <h5>Rent ID: </h5>
                            <h5>Confirmation Number: </h5>
                            <h5>Vehicle Type: </h5>
                            <h5>Vehicle License: </h5>
                            <h5>Driver's License: </h5>
                            <h5>Location: </h5>
                            <h5>City: </h5>
                            <h5>Rent Date: </h5>
                            <h5>Rent Time: </h5>
                            <h5>Return Date: </h5>
                            <h5>Return Time: </h5>
                            <h5>Odometer: </h5>
                        </div>
                        <div className={"col-sm"} style={{textAlign: "left"}}>
                            <h5>{this.props.rentDetail.rid}</h5>
                            <h5>{this.props.rentDetail.confno}</h5>
                            <h5>{this.props.rentDetail.vtname}</h5>
                            <h5>{this.props.rentDetail.vlicense}</h5>
                            <h5>{this.props.rentDetail.dlicense}</h5>
                            <h5>{this.props.rentDetail.location}</h5>
                            <h5>{this.props.rentDetail.city}</h5>
                            <h5>{this.props.rentDetail.fromdate}</h5>
                            <h5>{this.props.rentDetail.fromtime}</h5>
                            <h5>{this.props.rentDetail.todate}</h5>
                            <h5>{this.props.rentDetail.totime}</h5>
                            <h5>{this.props.rentDetail.odometer}</h5>
                        </div>
                    </div>
                </div>
            </Fade>

        )
    }
}


export default RentTable;
