import React from 'react';
import {Table} from "react-bootstrap";

class VehicleTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSubmit = (state) => {

    };

    render() {
        const divStyle = {
            margin: "20px 0"
        };
        const tableStyle = {
            margin: "10px 0"
        };
        return (
            <div style={divStyle}>
                <h5>{this.props.vehicles.length} Vehicles available</h5>
                <Table bordered hover style={tableStyle}>
                    <thead>
                    <tr>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Year</th>
                        <th>Color</th>
                        <th>Vehicle Type</th>
                        <th>Location</th>
                        <th>City</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.vehicles.map((car) => {
                        return (
                            <tr key={car.vlicense}>
                                <td>{car.make}</td>
                                <td>{car.model}</td>
                                <td>{car.year}</td>
                                <td>{car.color.toUpperCase()}</td>
                                <td>{car.vtname}</td>
                                <td>{car.location}</td>
                                <td>{car.city}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>
            </div>
        )
    }
}


export default VehicleTable;
