import React from 'react';
import {Fade, Table} from "react-bootstrap";
import moment from "moment";

class ReportTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicleTypes: ['Economy', 'Compact', 'Mid-size', 'Standard', 'Full-size', 'SUV', 'Truck'],
        };
    }

    getPerCategory() {
        const numByType = {
            Economy: 0,
            Compact: 0,
            "Mid-size": 0,
            Standard: 0,
            "Full-size": 0,
            SUV: 0,
            Truck: 0,
        };

        this.props.report.perCategory.forEach((category) => {
            numByType[category.vtname] = category["count"];
        });

        const action = this.props.action === "rental" ? "Rental" : "Return";

        return (
            <React.Fragment>
                <h5>Number of {action} Per Vehicle Type</h5>
                <Table bordered hover>
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
            </React.Fragment>
        );
    }

    getPerBranch() {
        const action = this.props.action === "rental" ? "Rental" : "Return";

        return (
            <React.Fragment>
                <h5>Number of {action} Per Branch</h5>
                <Table bordered hover>
                    <thead>
                    <tr>
                        {this.props.report.perBranch.map((branch, idx) => {
                            return (<th key={idx}>{branch.city} - {branch.location}</th>)
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        {this.props.report.perBranch.map((branch, idx) => {
                            return (<td key={idx}>{branch.count}</td>)
                        })}
                    </tr>
                    </tbody>
                </Table>
            </React.Fragment>
        );
    }

    getVehicles() {
        const action = this.props.action === "rental" ? "Rented" : "Returned";

        return (
            <React.Fragment>
                <h5> {this.props.report.perCompany} Vehicle(s) {action}</h5>
                <Table bordered hover>
                    <thead>
                    <tr>
                        <th>Vehicle License</th>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Year</th>
                        <th>Color</th>
                        <th>Odometer</th>
                        <th>Vehicle Type</th>
                        <th>Location</th>
                        <th>City</th>
                        <th>Rent ID</th>
                        <th>From</th>
                        <th>To</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.report.vehicle.map((car, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{car.vlicense}</td>
                                <td>{car.make}</td>
                                <td>{car.model}</td>
                                <td>{car.year}</td>
                                <td>{car.color.toUpperCase()}</td>
                                <td>{car.odometer}</td>
                                <td>{car.vtname}</td>
                                <td>{car.location}</td>
                                <td>{car.city}</td>
                                <td>{car.rid}</td>
                                <td>{moment(car.fromdate).format("YYYY-MM-DD")} {moment(car.fromtime, "hh:mm:ss").format("LT")}</td>
                                <td>{moment(car.todate).format("YYYY-MM-DD")} {moment(car.totime, "hh:mm:ss").format("LT")}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </React.Fragment>
        );
    }

    getRevenuePerCategory() {
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

        return (
            <React.Fragment>
                <h5>Revenue Per Vehicle Type</h5>
                <Table bordered hover>
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
        );
    }

    getRevenuePerBranch() {
        return (
            <React.Fragment>
                <h5>Revenue Per Branch</h5>
                <Table bordered hover>
                    <thead>
                    <tr>
                        <th style={{width: "33%"}}>City</th>
                        <th style={{width: "33%"}}>Location</th>
                        <th style={{width: "33%"}}>Sum</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.report.revenuePerBranch.map((branch, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{branch.city}</td>
                                <td>{branch.location}</td>
                                <td>{branch.sum}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </React.Fragment>
        );
    }

    getRevenueTotal() {
        let sum = 0;
        this.props.report.revenuePerBranch.forEach((branch) => {
            sum += Number(branch.sum);
        });
        return (
            <React.Fragment>
                <h5>Total Revenue: ${sum} </h5>
            </React.Fragment>
        );
    }


    render() {
        const divStyle = {
            margin: "30px 0",
        };
        let table;

        if (!this.props.report.vehicle || this.props.report.vehicle.length === 0) {
            table = <h5>No result matching the criteria is available</h5>;
        } else {
            if (this.props.action === "rental") {
                // Rentals
                table = (
                    <React.Fragment>
                        {this.getVehicles()}
                        {this.getPerCategory()}
                        {this.getPerBranch()}
                    </React.Fragment>
                )
            } else {
                // Returns
                if (this.props.location === "all") {
                    // Daily Returns
                    table = (
                        <React.Fragment>
                            {this.getVehicles()}
                            {this.getPerCategory()}
                            {this.getRevenuePerCategory()}
                            {this.getPerBranch()}
                            {this.getRevenuePerBranch()}
                            {this.getRevenueTotal()}
                        </React.Fragment>
                    );
                } else {
                    // Daily Returns for Branch
                    table = (
                        <React.Fragment>
                            {this.getVehicles()}
                            {this.getPerCategory()}
                            {this.getRevenuePerCategory()}
                            {this.getPerBranch()}
                            {this.getRevenuePerBranch()}
                        </React.Fragment>
                    );
                }
            }
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
