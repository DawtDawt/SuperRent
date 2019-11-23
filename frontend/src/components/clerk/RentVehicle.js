import React from 'react';
import {Button} from "react-bootstrap";
import ClerkNavbar from "./ClerkNavbar";
import Form from "react-bootstrap/Form";
import {createCustomer, createReserve, createRent, getVehicle} from "../Fetch";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment";

class RentVehicle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "Economy": "https://www.avis.ca/content/dam/cars/l/2016/chevrolet/2016-chevrolet-spark-ev-hatchback-black.png",
            "Compact": "https://www.avis.ca/content/dam/cars/l/2016/chevrolet/2016-chevrolet-sonic-lt-at-sedan-side-view-black.png",
            "Standard": "https://www.avis.ca/content/dam/cars/l/2016/hyundai/2016-hyundai-sonata-limited-sedan-venetian-red.png",
            "Full-size": "https://www.avis.ca/content/dam/cars/l/2016/chevrolet/2016-chevrolet-impala-2lt-sedan-black.png",
            "SUV": "https://www.avis.ca/content/dam/cars/l/2017/jeep/2017-jeep-grand-cherokee-limited-suv-black.png",
            "Truck": "https://www.avis.ca/content/dam/cars/l/2015/ford/2015-ford-f-150-xlt-pick-up-side-view-black.png",
            "Mid-size": "https://www.avis.ca/content/dam/cars/l/2018/hyundai/2018-hyundai-elantra-limited-sedan-black.png",
        };
    }

    getCardInfo() {
        const cardno = document.getElementById("cardno").value;
        const cardname = document.getElementById("cardname").value;
        const expdate = document.getElementById("expdate").value;
        if (cardno && cardname && expdate) {
            return {
                cardno,
                cardname,
                expdate: moment("28/" + expdate, "DD/MM/YY").format("YYYY-MM-DD")
            }
        } else {
            alert("Missing required card information");
            throw Error("Missing required card information");
        }
    }

    newCustomer = async () => {
        try {
            const {city, location, fromdate, todate, fromtime, totime, vtname, vlicense} = this.props.match.params;
            const {cardno, cardname, expdate} = this.getCardInfo();

            // console.log(city);
            // console.log(location);
            // console.log(fromdate);
            // console.log(todate);
            // console.log(fromtime);
            // console.log(totime);
            // console.log(vtname);
            // console.log(vlicense);
            // console.log(cardno);
            // console.log(cardname);
            // console.log(expdate);

            // Register customer
            const newDlicense = await this.register();

            const vehicles = await getVehicle({
                vtname,
                location,
                city,
                fromdate: decodeURIComponent(fromdate),
                todate: decodeURIComponent(todate),
                fromtime: decodeURIComponent(fromtime),
                totime: decodeURIComponent(totime),
            });

            // Reserve
            const confNo = await this.reserve(newDlicense);

            // Rent
            const rid = await createRent(vehicles.data[0].vlicense, newDlicense, fromdate, todate, decodeURIComponent(fromtime), decodeURIComponent(totime), vehicles.data[0].odometer, cardname, cardno, expdate, confNo);

            window.location.href = `/clerk/rent/success/${city}/${location}/${fromdate}/${todate}/${fromtime}/${totime}/${vtname}/${vlicense}/${rid}/${newDlicense}`;
        } catch (e) {
            console.log(e);
        }

    };

    returningCustomer = async () => {
        try {
            const {city, location, fromdate, todate, fromtime, totime, vtname, vlicense} = this.props.match.params;
            const {cardno, cardname, expdate} = this.getCardInfo();

            const dlicense = document.getElementById("returning-customer-dlicense").value;

            const vehicles = await getVehicle({
                vtname,
                location,
                city,
                fromdate: decodeURIComponent(fromdate),
                todate: decodeURIComponent(todate),
                fromtime: decodeURIComponent(fromtime),
                totime: decodeURIComponent(fromtime),
            });

            // Reserve
            const confNo = await this.reserve(dlicense);

            // Rent
            const rid = await createRent(vehicles.data[0].vlicense, dlicense, fromdate, todate, decodeURIComponent(fromtime), decodeURIComponent(totime), vehicles.data[0].odometer, cardname, cardno, expdate, confNo);

            window.location.href = `/clerk/rent/success/${city}/${location}/${fromdate}/${todate}/${fromtime}/${totime}/${vtname}/${vlicense}/${rid}/${dlicense}`;
        } catch (e) {
            console.log(e);
        }
    };

    register = async () => {
        const name = document.getElementById("new-customer-name").value;
        const cellphone = document.getElementById("new-customer-cellphone").value;
        const address = document.getElementById("new-customer-address").value;
        const dlicense = document.getElementById("new-customer-dlicense").value;

        return await createCustomer(name, cellphone, address, dlicense);
    };

    reserve = async (dlicense) => {
        const {city, location, fromdate, todate, fromtime, totime, vtname} = this.props.match.params;

        return await createReserve(vtname, dlicense, location, city, fromdate, todate, fromtime, totime);
    };


    render() {
        const style = {
            margin: "30px 100px",
            border: "1px solid transparent",
            borderRadius: "35px",
            background: "#FFFFFF",
            boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
            transition: "all 0.3s cubic-bezier(.25,.8,.25,1)"
        };
        const centerStyle = {
            textAlign: "center"
        };
        const customerFormStyle = {
            margin: "30px 20px",
            textAlign: "left"
        };
        const vertLineStyle = {
            margin: "0px 30px",
            borderLeft: "1px solid grey",
            height: "420px"
        };
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
        const {city, location, fromdate, todate, fromtime, totime, vtname} = this.props.match.params;

        return (
            <React.Fragment>
                <ClerkNavbar/>
                <div style={style}>
                    <div className={"row"} style={customerFormStyle}>
                        <div className={"col-sm"}>
                            <div>
                                <h5>Pick-up Location</h5>
                                <h3>{location} - {city}</h3>
                                <h5>From {fromdate} {fromtime} <br/> To {todate} {totime}</h5>
                            </div>
                        </div>
                        <div className={"col-sm"} style={centerStyle}>
                            <img src={this.state[vtname]} alt={"vehicleType"} height={"100px"}/>
                            <h5>{vtname}</h5>
                        </div>
                    </div>
                    <div style={consoleStyle}>
                        <div className={"payment-info"} style={paymentStyle}>
                            <Form>
                                <Form.Group as={Row} controlId="cardname">
                                    <Form.Label column sm="3">
                                        Credit Card Name
                                    </Form.Label>
                                    <Col sm="9">
                                        <Form.Control type="text" placeholder="Enter Card Name" name = "cardname"/>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row}>
                                    <Form.Label column sm="3">
                                        Credit Card Number
                                    </Form.Label>
                                    <Col sm="5">
                                        <Form.Control id="cardno" type="number" placeholder="Enter Card Number" name = "cardno"/>
                                    </Col>
                                    <Form.Label column sm="2">
                                        Expiry Date
                                    </Form.Label>
                                    <Col sm="2">
                                        <Form.Control id="expdate" type="text" placeholder="MM/YY" name = "expdate"/>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                    <div className={"row"} style={customerFormStyle}>
                        <div className={"col-sm"}>
                            <Form>
                                <h3>New Customer</h3>
                                <Form.Group controlId="new-customer-name">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Full Name"/>
                                </Form.Group>
                                <Form.Group controlId="new-customer-cellphone">
                                    <Form.Label>Cellphone</Form.Label>
                                    <Form.Control type="tel" placeholder="Enter Cellphone"/>
                                </Form.Group>
                                <Form.Group controlId="new-customer-address">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="tel" placeholder="Enter Address"/>
                                </Form.Group>
                                <Form.Group controlId="new-customer-dlicense">
                                    <Form.Label>Driver's License</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Driver's license"/>
                                </Form.Group>
                                <Button variant="primary" type="button" onClick={this.newCustomer}>
                                    Register & Rent
                                </Button>
                            </Form>
                        </div>
                        <div style={vertLineStyle}></div>
                        <div className={"col-sm"}>
                            <Form>
                                <h3>Returning Customer</h3>
                                <Form.Group controlId="returning-customer-dlicense">
                                    <Form.Label>Driver's License</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Driver's License"/>
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="primary" type="button" onClick={this.returningCustomer}>
                                        Rent
                                    </Button>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>

                </div>
            </React.Fragment>
        )
    }
}

export default RentVehicle;
