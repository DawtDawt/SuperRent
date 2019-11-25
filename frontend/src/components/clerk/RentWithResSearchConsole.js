import React from 'react';
import {Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import moment from "moment";
import RentWithResTable from "./RentWithResTable";
import {createRent, getReserve, getVehicle} from "../Fetch";
import {renderOnDiv, validateExpDate} from "../Util";

class RentWithResSearchConsole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSubmit = async (event) => {
        try {
            // Get reservation detail
            const reserveReponse = await getReserve(this.state.confno);
            if (reserveReponse.error) {
                console.log(reserveReponse.error);
                this.setState({ReservationDetail: []});
            } else {
                this.setState({ReservationDetail: reserveReponse.data});
            }
            const body = {
                city: reserveReponse.city,
                location: reserveReponse.location,
                fromdate: reserveReponse.fromdate,
                todate: reserveReponse.todate,
                fromtime: reserveReponse.fromtime,
                totime: reserveReponse.totime,
                vtname: reserveReponse.vtname,
            };

            // Get vehicle to be rented
            const vehicleResponse = await getVehicle(body);
            if (vehicleResponse.error) {
                console.log(vehicleResponse.error);
                this.setState({vehicles: []});
            } else {
                this.setState({vehicles: vehicleResponse.data});
            }

            let rawExpdate = document.getElementById("expdate").value;
            validateExpDate(rawExpdate);
            const expdate = moment("28/" + rawExpdate, "DD/MM/YY").format("YYYY-MM-DD");

            // Create rental
            const rid = await createRent(
                vehicleResponse.data[0].vlicense,
                reserveReponse.dlicense,
                reserveReponse.fromdate,
                reserveReponse.todate,
                reserveReponse.fromtime,
                reserveReponse.totime,
                this.state.cardname,
                this.state.cardno,
                expdate,
                this.state.confno);

            const rentDetail = {
                    rid: rid,
                    confno: this.state.confno,
                    vtname: reserveReponse.vtname,
                    vlicense: vehicleResponse.data[0].vlicense,
                    dlicense: reserveReponse.dlicense,
                    location: reserveReponse.location,
                    city: reserveReponse.city,
                    fromdate: moment(reserveReponse.fromdate).format("YYYY-MM-DD"),
                    todate: moment(reserveReponse.todate).format("YYYY-MM-DD"),
                    fromtime: reserveReponse.fromtime,
                    totime: reserveReponse.totime,
                    cardname: this.state.cardname,
                    cardno: this.state.cardno,
                    expdate: this.state.expdate,
                    odometer: vehicleResponse.data[0].odometer
                };

            renderOnDiv("rent-result", <RentWithResTable rentDetail={rentDetail}/>);

        } catch (e) {
            console.log(e);
        }
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state.expdate);
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
                                    <Form.Control type="text" placeholder="Enter Card Name" name="cardname"
                                                  onChange={this.handleChange}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlID="cardno">
                                <Form.Label column sm="3">
                                    Credit Card Number
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control id="cardno" type="number" placeholder="Enter Card Number"
                                                  name="cardno" onChange={this.handleChange}/>
                                </Col>
                                <Form.Label column sm="2">
                                    Expiry Date
                                </Form.Label>
                                <Col sm="2">
                                    <Form.Control id="expdate" type="text" placeholder="MM/YY" name="expdate"
                                                  onChange={this.handleChange}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="confno">
                                <Form.Label column sm="3">
                                    Confirmation Number
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="text" placeholder="Enter Confirmation Number" name="confno"
                                                  onChange={this.handleChange}/>
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

