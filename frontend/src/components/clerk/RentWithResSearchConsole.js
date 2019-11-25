import React from 'react';
import ReactDOM from 'react-dom';
import {Button, ButtonGroup, DropdownButton, DropdownItem} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import moment from "moment";
import RentWithResTable from "./RentWithResTable";
import Spinner from "react-bootstrap/Spinner";
import {createRent, getReserve, getVehicle} from "../Fetch";

class RentWithResSearchConsole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getBody = (data) => {
        const body = {};
        body["city"] = data.city;
        body["location"] = data.location;
        body["fromdate"] = data.fromdate;
        body["todate"] = data.todate;
        body["fromtime"] = data.fromtime;
        body["totime"] = data.totime;
        body["vtname"] = data.vtname;
        return body;
    };

    handleSubmit = async (event) =>{
        try {
            const confno = this.state.confno;

            // Get reservation
            const reserveResponse = await getReserve(confno);
            this.setState({ReservationDetail: reserveResponse.data});

            // Get vehicles
            const body = this.getBody(reserveResponse);
            const vehicles = await getVehicle(body);
            this.setState({vehicles: vehicles.data});

            // Get params
            const vlicense = vehicles.data[0].vlicense;
            const dlicense = reserveResponse.dlicense;
            const fromdate = reserveResponse.fromdate;
            const todate = reserveResponse.todate;
            const fromtime = reserveResponse.fromtime;
            const totime = reserveResponse.totime;
            const cardname = this.state.cardname;
            const cardno = this.state.cardno;
            let expdate = document.getElementById("expdate").value;
            if (!expdate.includes("/") || expdate.split("/").length !== 2 || expdate.split("/")[0].length !== 2 || expdate.split("/")[1].length !== 2) {
                alert("Invalid expiry date format");
                throw Error("Invalid expiry date format")
            }
            expdate = moment("28/" + expdate, "DD/MM/YY").format("YYYY-MM-DD");

            // Create Rent
            const rentResponse = await createRent(vlicense, dlicense, fromdate, todate, fromtime, totime, cardname, cardno, expdate, confno);

            const rid = rentResponse.rid;
            const vtname = reserveResponse.vtname;
            const location = reserveResponse.location;
            const city = reserveResponse.city;
            const odometer = vehicles.data[0].odometer;
            const rentDetail = {
                rid: rid,
                confno: confno,
                vtname: vtname,
                vlicense: vlicense,
                dlicense: dlicense,
                location: location,
                city: city,
                fromdate: fromdate,
                todate: todate,
                fromtime: fromtime,
                totime: totime,
                cardname: cardname,
                cardno: cardno,
                expdate: expdate,
                odometer: odometer
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
                ReactDOM.render(<RentWithResTable rentDetail={rentDetail}/>, document.getElementById("rent-result"))
            }, 500);
        } catch (e) {
            console.log(e);
        }
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
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
            overflowY: "scroll",
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

                            <Form.Group as={Row} controlID="cardno">
                                <Form.Label column sm="3">
                                    Credit Card Number
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control id="cardno" type="number" placeholder="Enter Card Number" name = "cardno" onChange={this.handleChange}/>
                                </Col>
                                <Form.Label column sm="2">
                                    Expiry Date
                                </Form.Label>
                                <Col sm="2">
                                    <Form.Control id="expdate" type="text" placeholder="MM/YY" name = "expdate" onChange={this.handleChange}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="confno">
                                <Form.Label column sm="3">
                                    Confirmation Number
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="text" placeholder="Enter Confirmation Number" name = "confno" onChange={this.handleChange}/>
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                    <Button size={"lg"} onClick={this.handleSubmit}>Generate Receipt</Button>
                    <div id={"rent-result"}></div>
                </div>
            </React.Fragment>
        )
    }
}


export default RentWithResSearchConsole;

