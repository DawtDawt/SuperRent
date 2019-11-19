import React from "react";
import {Button, ButtonGroup, DropdownButton, DropdownItem, Form} from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";

class ReportForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            branchSelection: [],
            rentalSelection: [],
            returnSelection: [],
            optionSelection: ['Daily Rentals', 'Daily Returns'],
        };
    }

    componentDidMount() {
        fetch("http://localhost:8080/table/customer")
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data.data);
                this.setState({rentalSelection: data.data});
                this.setState({returnSelection: data.data});
            })
            .catch(console.log);

    }


    isFormFilled = () => {
        return this.state.hasOwnProperty("customer");
    };


    handleSubmit = (event) => {
        event.preventDefault();
        // Check if all forms have been filed
        if (this.isFormFilled()) {
            console.log('form')
        } else {

        }
    };


    handleChange = (event) => {
        const btnName = event.target.className.split(" ")[0];
        document.getElementById(btnName).innerText = event.target.value;
        document.getElementById(btnName).className = document.getElementById(btnName).className.concat(" btn-success");
        this.setState({[btnName]: event.target.value});
        console.log(event.target.value);
    };



    render (){

        const btnStyle = {
            width: "300px",
            // height: "50px",
            margin: "000px",
        };

        const dropdownStyle = {
            maxHeight: "200px",
            width: "160px",
            overflowY: "scroll"
        };

        return (
            <React.Fragment>
                <Form.Group>
                    <ButtonGroup size={'lg'}>

                        <DropdownButton title={"Report Type"} size={"lg"} id={"reportType"} style={btnStyle}
                                        as={ButtonGroup}>
                            {this.state.optionSelection.map((elem, idx) => {
                                return <DropdownItem key={idx} value={elem} as={"button"} className={"reportType"}
                                                     onClick={this.handleChange}
                                                     style={btnStyle}>{elem}</DropdownItem>;
                            })}
                        </DropdownButton>

                        <DropdownButton title={"Location"} size={"lg"} id={"branch"} style={btnStyle}
                                        as={ButtonGroup}>
                            <DropdownItem key={"-1"} value={"any"} as={"button"}> All Locations
                            </DropdownItem>
                            {this.state.branchSelection.map((elem, idx) => {
                                return <DropdownItem key={idx} value={elem.location} as={"button"} className={"branch"}
                                                     onClick={this.handleChange}
                                                     style={btnStyle}>{elem.location}</DropdownItem>;
                            })}
                        </DropdownButton>


                        <Button size={"lg"} onClick={this.handleSubmit} style={{margin: "0px"}}>Generate Report</Button>
                    </ButtonGroup>
                </Form.Group>
            </React.Fragment>
        )
    }
}

export default ReportForm;