import React from 'react';
import {Button, ButtonGroup, DropdownButton, DropdownItem} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class RentSearchConsole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // TODO
    // * Sanitize expiry date input to accommodate "/" and convert to YYYY-MM-DD format for database
    // * Check if 2nd fetch works
    // * Render receipt
    handleSubmit = async (event) => {
        const cardname = document.getElementById("cardname").value;
        const cardno = document.getElementById("cardno").value;
        const expdate = document.getElementById("expdate").value;
        if (this.state.confno && cardname && cardno && expdate) {
            try {
                const reserveResponse = await fetch("http://localhost:8080/reserve/get?confno=" + this.state.confno);
                const reserveContent = await reserveResponse.json();
                if (reserveContent.error) {
                    alert(reserveContent.error);
                    console.log(reserveContent.error);
                    throw Error("Error getting confirmation number");
                }


                const {confno, vtname, dlicense, location, city, fromdate, todate, fromtime, totime} = reserveContent.data;
                const rentResponse = await fetch("http://localhost:8080/rent/create", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: {
                        confno,vtname, dlicense, location, city, fromdate, todate, fromtime, totime, cardname, cardno, expdate
                    }
                });
                const rid = await rentResponse.json();
                console.log(rid);
            } catch (e) {
                console.log(e);
            }
        }
    };

    handleChange = (event) => {
        document.getElementById("confno").innerText = event.target.value;
        document.getElementById("confno").className = document.getElementById("confno").className.concat(" btn-success");
        document.getElementById("confno").className = document.getElementById("confno").className.split(" ").filter((elem) => {
            return elem !== "btn-outline-primary";
        }).join(" ");
        this.setState({confno: event.target.value});
        console.log(event.target.value);
    };

    render() {

        const locationStyle = {
            margin: "5px",
            width: "350px",
        };

        const dropdownStyle = {
            maxHeight: "350px",
            overflowY: "scroll"
        };

        const locationDropdownStyle = {
            width: "350px",
            overflowY: "scroll",
        };

        const consoleStyle = {
            margin: "20px",
            padding: "20px",
            textAlign: "center"
        };

        const paymentStyle = {
            textAlign: "left",
            padding: " 30px 50px",
        };

        return (
            <React.Fragment>
                <div style={consoleStyle}>
                    <div className={"payment-info"} style={paymentStyle}>
                        <Form>
                            <Form.Group as={Row} controlId="cardname">
                                <Form.Label column sm="4">
                                    Card Name
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" placeholder="Enter Card Name" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="cardno">
                                <Form.Label column sm="4">
                                    Credit Card Number
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="number" placeholder="Enter Card Number" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="expdate">
                                <Form.Label column sm="4">
                                    Expiry Date
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" placeholder="MM/YY" />
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                    <DropdownButton title={"Confirmation Number"} size={"lg"} id={"confno"} style={locationStyle}
                                    as={ButtonGroup}
                                    variant={"outline-primary"}
                                    drop={'down'}>
                        <div style={dropdownStyle}>
                            {this.props.confNoSelection.map((elem, idx) => {
                                return <DropdownItem key={idx} value={elem.confno} as={"button"}
                                                     className={"reserve-location"}
                                                     onClick={this.handleChange}
                                                     style={locationDropdownStyle}>{elem.confno}</DropdownItem>;
                            })}
                        </div>
                    </DropdownButton>
                    <Button size={"lg"} onClick={this.handleSubmit}>Generate Receipt</Button>
                </div>


            </React.Fragment>
        )
    }
}


export default RentSearchConsole;

