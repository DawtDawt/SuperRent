import React from 'react';
import ReactDOM from 'react-dom';
import {Button, ButtonGroup, Dropdown, DropdownButton, DropdownItem} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import moment from "moment";
import RentTable from "./RentTable";
import Spinner from "react-bootstrap/Spinner";
import {createRent, createReturn} from "../Fetch";
import {DateRangePicker} from "react-dates";

class RentForNewSearchConsole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vtnameSelection: ['Economy', 'Compact', 'Mid-size', 'Standard', 'Full-size', 'SUV', 'Truck'],
        };
    }

    handleSubmit = async (event) =>{
        // temp handle submit before fetch is setup
        const Rentalresponse = await createRent(1,1,"2019-10-30","2019-11-02","12:00 PM","2:00 PM",3000, this.state.cardname,this.state.cardno,this.state.expdate, this.state.cnum);
        const rentDetail = {
            rid: Rentalresponse.data,
            confno: 1,
            vtname: "SUV",
            vlicense: "ABC000",
            dlicense: "00000",
            location: "UBC",
            city: "Vancouver",
            fromdate: "2019-10-30",
            todate: "2019-11-02",
            fromtime: "12:00 PM",
            totime: "2:00 PM",
            cardname: "VISA",
            cardno: this.state["cardnum"],
            expdate: "04/25",
            odometer: 3000
        };
        ReactDOM.render(
            <div style={{margin: "30px"}}>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>,
            document.getElementById("rent-result")
        );

        setTimeout(() => {
            ReactDOM.render(<RentTable rentDetail={rentDetail}/>, document.getElementById("rent-result"))
        }, 500);
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        console.log(event.target.name);
        console.log(event.target.value);
    };

    render() {
        const consoleStyle = {
            margin: "20px",
            textAlign: "center"
        };

        const paymentStyle = {
            textAlign: "left",
            margin: "auto",
            maxWidth: "700px",
            padding: "0px"
        };

        const locationDropdownStyle = {
            maxHeight: "205px",
            width: "300px",
            overflowY: "scroll",
        };

        const locationStyle = {
            margin: "5px",
            width: "350px",
        };

        const dropdownStyle = {
            maxHeight: "205px",
            // width: "300px",
            overflowY: "scroll",
        };

        const timeStyle = {
            width: "180px",
            margin: "5px"
        };

        const flexStyle = {
            margin: "20px 0 0 0",
            minWidth: "100%",
            display: "flex", flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center"
        };
        return (
            <React.Fragment>
                <div style={consoleStyle}>
                    <div className={"payment-info"} style={paymentStyle}>
                        <Form>
                            <Form.Group as={Row} controlId="cardname">
                                <Form.Label column sm="3">
                                    Credit Card Name
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="text" placeholder="Enter Card Name" name = "cardname" onChange={this.handleChange}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="3">
                                    Credit Card Number
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control id="cardno" type="number" placeholder="Enter Card Number" name = "cardnum" onChange={this.handleChange}/>
                                </Col>
                                <Form.Label column sm="2">
                                    Expiry Date
                                </Form.Label>
                                <Col sm="2">
                                    <Form.Control id="expdate" type="text" placeholder="MM/YY" name = "carddate" onChange={this.handleChange}/>
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                    <Button size={"lg"} onClick={this.handleSubmit}>Generate Receipt</Button>
                    <div id={"rent-result"}></div>
                </div>
                <h1>
                    Select Your Car????
                </h1>
                <div style={flexStyle}>
                    <DropdownButton title={"Location"} size={"lg"} id={"reportLocation"} style={locationStyle}
                                    as={ButtonGroup}
                                    variant={"outline-primary"}
                                    drop={'down'}>
                    </DropdownButton>
                    <DateRangePicker
                        startDate={this.state["browse-startdate"]} // momentPropTypes.momentObj or null,
                        startDateId="browse-startdate" // PropTypes.string.isRequired,
                        endDate={this.state["browse-todate"]} // momentPropTypes.momentObj or null,
                        endDateId="browse-todate" // PropTypes.string.isRequired,
                        onDatesChange={({startDate, endDate}) => this.setState({
                            "browse-startdate": startDate,
                            "browse-todate": endDate
                        })} // PropTypes.func.isRequired,
                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => this.setState({focusedInput})} // PropTypes.func.isRequired,
                    />
                    <DropdownButton title={"Start Time"}
                                    value={this.state["browse-fromtime"]}
                                    size={"lg"}
                                    variant={"outline-primary"}
                                    as={ButtonGroup} id={"browse-fromtime"} style={timeStyle}>
                        <Dropdown.Divider/>
                        <div style={dropdownStyle}>
                            {this.props.times.map((elem, idx) => {
                                return <DropdownItem key={idx} value={elem} as={"button"}
                                                     onClick={this.handleChange}
                                                     className={"browse-fromtime"}>{elem}</DropdownItem>;
                            })}
                        </div>
                    </DropdownButton>
                    <DropdownButton title={"End Time"}
                                    value={this.state["browse-totime"]}
                                    size={"lg"}
                                    variant={"outline-primary"}
                                    as={ButtonGroup} id={"browse-totime"} style={timeStyle}>
                        <div style={dropdownStyle}>
                            <Dropdown.Divider/>
                            {this.props.times.map((elem, idx) => {
                                return <DropdownItem key={idx} value={elem} as={"button"}
                                                     onClick={this.handleChange}
                                                     className={"browse-totime"}>{elem}</DropdownItem>;
                            })}
                        </div>
                    </DropdownButton>
                    <DropdownButton title={"Any Car Type"}
                                    value={this.state["browse-vtname"]}
                                    size={"lg"}
                                    variant={"outline-primary"}
                                    as={ButtonGroup} id={"browse-vtname"} style={timeStyle}>
                        <div style={dropdownStyle}>
                            <DropdownItem key={"-1"} value={"Any Car Type"} as={"button"}
                                          onClick={this.handleAnySelection}
                                          className={"browse-vtname"}>Any Car Type</DropdownItem>
                            <Dropdown.Divider/>
                            {this.state.vtnameSelection.map((elem, idx) => {
                                return <DropdownItem key={idx} value={elem} as={"button"}
                                                     onClick={this.handleChange}
                                                     className={"browse-vtname"}>{elem}</DropdownItem>;
                            })}
                        </div>
                    </DropdownButton>
                </div>
                <div style={{textAlign: "center"}}>
                    <Button size={"lg"} onClick={() => this.handleSubmit(this.state)}
                            style={{margin: "10px 0"}}>Search</Button>
                </div>
                <div id="browse-result"></div>
            </React.Fragment>
        )
    }
}


export default RentForNewSearchConsole;

