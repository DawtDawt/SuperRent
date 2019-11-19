import React from 'react';
import {Table} from "react-bootstrap";

class BrowseTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
        };
    }

    handleSubmit = (state) => {

    };

    fadeIn() {
        setTimeout(() => {
            Array.from(document.getElementsByClassName("reserveTable")).forEach((elem) => {
                elem.className += " visible";
            });
        }, 0);
    }

    render() {
        const divStyle = {
            margin: "20px 0",
        };
        const tableStyle = {
            textAlign: "middle",
            padding: "0"
        };
        let table;
        if (this.props.vehicles.length > 0) {
            table =
                <React.Fragment>
                    <h5> {this.props.vehicles.length} Vehicle(s) available </h5>
                    <Table bordered hover style={tableStyle}>
                        <thead>
                        <tr>
                            <th style={{width: "15%"}}>Make</th>
                            <th style={{width: "15%"}}>Model</th>
                            <th style={{width: "10%"}}>Year</th>
                            <th style={{width: "10%"}}>Color</th>
                            <th style={{width: "15%"}}>Vehicle Type</th>
                            <th style={{width: "20%"}}>Location</th>
                            <th style={{width: "15%"}}>City</th>
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
                            )
                        })}
                        </tbody>
                    </Table>
                </React.Fragment>
        } else {
            table = <h5>No vehicle matching the criteria is available</h5>;
        }

        return (
            <div style={divStyle}>
                {table}
            </div>
        )
    }
}


export default BrowseTable;
