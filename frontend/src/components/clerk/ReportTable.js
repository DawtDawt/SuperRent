import React from 'react';
import {Fade, Table} from "react-bootstrap";

class ReportTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicleTypes: ['Economy', 'Compact', 'Mid-size', 'Standard', 'Full-size', 'SUV', 'Truck'],
        };
        console.log(this.props.report);
    }

    render() {
        const divStyle = {
            margin: "20px 0",
        };
        const tableStyle = {
            textAlign: "center",
        };
        let table;

        const action = this.props.action === "rental" ? "Rented" : "Returned";

        const numByType = {
            Economy: 0,
            Compact: 0,
            Mid: 0,
            Standard: 0,
            "Full-size": 0,
            SUV: 0,
            Truck: 0,
        };

        this.props.report.perCategory.forEach((category) => {
            numByType[category.vtname] = category.count
        });

        const revenueByType = {
            Economy: 0,
            Compact: 0,
            Mid: 0,
            Standard: 0,
            "Full-size": 0,
            SUV: 0,
            Truck: 0,
        };

        this.props.report.revenuePerCategory.forEach((category) => {
            revenueByType[category.vtname] = category.sum
        });

        // TODO
        if (this.props.report.vehicle.length > 0) {
            table =
                <React.Fragment>
                    <h5 style={tableStyle}> {this.props.report.perCompany} Vehicle(s) {action}</h5>
                    <Table bordered hover style={tableStyle}>
                        <thead>
                        <tr>
                            <th style={{width: "33%"}}>Vehicle Type</th>
                            <th style={{width: "33%"}}>Location</th>
                            <th style={{width: "33%"}}>City</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.report.vehicle.map((car, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{car.vtname}</td>
                                    <td>{car.location}</td>
                                    <td>{car.city}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>

                    <h5>Number of {this.props.action}s Per Vehicle Type</h5>
                    <Table bordered hover style={tableStyle}>
                        <thead>
                        <tr>
                            {Object.keys(numByType).map((type, idx) => {
                                return (<th key={idx}>{type}</th>)
                            })}
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            {Object.keys(numByType).map((type, idx) => {
                                return (<td key={idx}>{numByType[type]}</td>)
                            })}
                        </tr>
                        </tbody>
                    </Table>

                    <h5>Revenue Per Vehicle Type</h5>
                    <Table bordered hover style={tableStyle}>
                        <thead>
                        <tr>
                            {Object.keys(revenueByType).map((type, idx) => {
                                return (<th key={idx}>{type}</th>)
                            })}
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            {Object.keys(revenueByType).map((type, idx) => {
                                return (<td key={idx}>${revenueByType[type]}</td>)
                            })}
                        </tr>
                        </tbody>
                    </Table>

                    <h5>Revenue Per Vehicle Type</h5>
                    <Table bordered hover style={tableStyle}>
                        <thead>
                        <tr>
                            {Object.keys(revenueByType).map((type, idx) => {
                                return (<th key={idx}>{type}</th>)
                            })}
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            {Object.keys(revenueByType).map((type, idx) => {
                                return (<td key={idx}>${revenueByType[type]}</td>)
                            })}
                        </tr>
                        </tbody>
                    </Table>
                </React.Fragment>
        } else {
            table = <h5 style={tableStyle}>No result matching the criteria is available</h5>;
        }

        return (
            <Fade appear={true} in={true}>
                <div style={divStyle}>
                    {table}
                </div>
            </Fade>
        )
    }
}


export default ReportTable;
