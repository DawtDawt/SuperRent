import React from 'react';
import {Accordion, Button, ButtonGroup, DropdownButton, DropdownItem, Form} from "react-bootstrap";
import {DateRangePicker} from 'react-dates';
import Card from "react-bootstrap/Card";


class VehicleFilters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            branchSelection: [],
            vehicleTypeSelection: ['Economy', 'Compact', 'Mid-Size', 'Standard', 'Full-size', 'SUV', 'Truck'],
        };
    }

    componentDidMount() {
        fetch("http://localhost:8080/table/branch")
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data.data);
                this.setState({branchSelection: data.data});
            })
            .catch(console.log);

        // temp branch data to replicate API call to /table/branch
        // this.setState({branchSelection: ['Vancouver', 'Richmond', 'Burnaby']});
    }

    generateTimes = () => {
        const times = [];
        times.push("12:00 AM", "12:30 AM");
        for (let i = 1; i < 12; i++) {
            times.push(String(i) + ":00 AM");
            times.push(String(i) + ":30 AM");
        }
        times.push("12:00 PM", "12:30PM");
        for (let i = 1; i < 12; i++) {
            times.push(String(i) + ":00 PM");
            times.push(String(i) + ":30 PM");
        }
        return times;
    };

    handleChange = (event) => {
        const btnName = event.target.className.split(" ")[0];
        document.getElementById(btnName).innerText = event.target.value;
        document.getElementById(btnName).className = document.getElementById(btnName).className.concat(" btn-success");
        this.setState({[btnName]: event.target.value});
        console.log(event.target.value);
    };

    handleSubmit = (event) => {
        event.preventDefault();
    };

    render() {
        return (
            <React.Fragment>
                <Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                Filters
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>Hello! I'm the filters</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </React.Fragment>
        )
    }
}


export default VehicleFilters;
