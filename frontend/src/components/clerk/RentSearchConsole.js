import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import moment from "moment";
import RentTable from "./RentTable";
import Spinner from "react-bootstrap/Spinner";

class RentSearchConsole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // TODO
    // * Render receipt
    // handleSubmit = async (event) => {
    //     const cardname = document.getElementById("cardname").value;
    //     const cardno = document.getElementById("cardno").value;
    //     const rawExpdate = document.getElementById("expdate").value;
    //     if (!/^[\d][\d]\/[\d][\d]$/.test(rawExpdate)) {
    //         alert("Incorrect format for expiry date");
    //         document.getElementById("expdate").value = "";
    //     } else if (this.state.confno && cardname && cardno) {
    //         const expdate = moment(`20${rawExpdate.split("/")[1]}/${rawExpdate.split("/")[0]}/28`).format("YYYY-MM-DD");
    //         try {
    //             // Get reservation info
    //             const reserveResponse = await fetch("http://localhost:8080/reserve/get?confno=" + this.state.confno);
    //             const reserveContent = await reserveResponse.json();
    //             if (reserveContent.error) {
    //                 alert(reserveContent.error);
    //                 console.log(reserveContent.error);
    //                 throw Error("Error getting confirmation number");
    //             }
    //
    //             const {confno, vtname, dlicense, location, city, fromdate, todate, fromtime, totime} = reserveContent.data;
    //
    //             // Select a car
    //             console.log("http://localhost:8080/table/vehicle");
    //             const carReponse = await fetch("http://localhost:8080/table/vehicle");
    //             const carContent = await carReponse.json();
    //             if (carContent.error) {
    //                 alert(carContent.error);
    //                 console.log(carContent.error);
    //                 throw Error("No vehicle information");
    //             }
    //             let vlicense;
    //             carContent.data.forEach((car) => {
    //                 if (car.status === "available" && car.vtname === vtname && car.location === location && car.city === city) {
    //                     vlicense = car.vlicense;
    //                 }
    //             });
    //
    //             const rentDetail = {
    //                 confno, vtname, vlicense, dlicense, location, city, fromdate, todate,
    //                 fromtime, totime, cardname, cardno, expdate, odometer: 3000
    //             };
    //
    //             // Rent car
    //             const rentResponse = await fetch("http://localhost:8080/rent/create", {
    //                 method: "POST",
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify(rentDetail)
    //             });
    //
    //             rentDetail.rid = await rentResponse.json();
    //
    //             ReactDOM.render(<RentTable rentDetail={rentDetail}/>, document.getElementById("rent-result"))
    //
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     } else {
    //         alert("Missing required information")
    //     }
    // };

    handleSubmit() {
        // temp handle submit before API is setup
        const rentDetail = {
            rid: 1,
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
            cardno: 1234520112412,
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

    encodeQuery(query) {
        return Object.keys(query).map(function (key) {
            return key + '=' + encodeURIComponent(query[key]);
        }).join('&');
    }

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
                                    Card Name
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="text" placeholder="Enter Card Name"/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="cardno">
                                <Form.Label column sm="3">
                                    Credit Card Number
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control type="number" placeholder="Enter Card Number"/>
                                </Col>
                                <Form.Label column sm="2">
                                    Expiry Date
                                </Form.Label>
                                <Col sm="2">
                                    <Form.Control controlId="expdate" type="text" placeholder="MM/YY"/>
                                </Col>
                            </Form.Group>

                            {/*<Form.Group as={Row} controlId="expdate">*/}
                            {/*    <Form.Label column sm="3">*/}
                            {/*        Expiry Date*/}
                            {/*    </Form.Label>*/}
                            {/*    <Col sm="9">*/}
                            {/*        <Form.Control type="text" placeholder="MM/YY"/>*/}
                            {/*    </Col>*/}
                            {/*</Form.Group>*/}

                            <Form.Group as={Row} controlId="confno">
                                <Form.Label column sm="3">
                                    Confirmation Number
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="text" placeholder="Enter Confirmation Number"/>
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


export default RentSearchConsole;

