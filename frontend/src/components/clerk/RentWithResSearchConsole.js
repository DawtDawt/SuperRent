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

    handleSubmit = async (event) =>{
        // temp handle submit before fetch is setup
        let RentalResponse;
        let rentDetail;
        let license;
        console.log("confno: " + this.state.confno);
        return getReserve(this.state.confno)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                    this.setState({ReservationDetail: []});
                } else {
                    this.setState({ReservationDetail: data.data});
                }
                const body = {};
                body["city"] = data.city;
                body["location"] = data.location;
                body["fromdate"] = data.fromdate;
                body["todate"] = data.todate;
                body["fromtime"] = data.fromtime;
                body["totime"] = data.totime;
                body["vtname"] = data.vtname;

                let odometer;
                const response = getVehicle(body)
                    .then(vdata => {
                        console.log(vdata.data[0].vlicense);
                        console.log(data.city);
                        if (vdata.error) {
                            console.log(vdata.error);
                            this.setState({vehicles: []});
                        } else {
                            this.setState({vehicles: vdata.data});
                        }
                        license = vdata.data[0].vlicense;
                        console.log(data.dlicense);
                        odometer = vdata.data[0].odometer;
                        this.setState({expdate: moment("28/" + this.state.expdate, "DD/MM/YY").format("YYYY-MM-DD")});
                        return createRent(vdata.data[0].vlicense, data.dlicense, data.fromdate, data.todate, data.fromtime, data.totime, this.state.cardname, this.state.cardno, this.state.expdate, this.state.confno);
                    })
                    .then(rid => {
                        console.log(rid);
                        rentDetail = {
                            rid: rid,
                            confno: this.state.confno,
                            vtname: data.vtname,
                            vlicense: license,
                            dlicense: data.dlicense,
                            location: data.location,
                            city: data.city,
                            fromdate: moment(data.fromdate).format("YYYY-MM-DD"),
                            todate: moment(data.todate).format("YYYY-MM-DD"),
                            fromtime: data.fromtime,
                            totime: data.totime,
                            cardname: this.state.cardname,
                            cardno: this.state.cardno,
                            expdate: this.state.expdate,
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
                    })
                    .catch(console.log);

                // try {
                //     console.log(license);
                //     RentalResponse = createRent(license, data.dlicense, moment(data.fromdate).format("YYYY-MM-DD"), moment(data.todate).format("YYYY-MM-DD"), data.fromtime, data.totime, 3000, this.state.cardname, this.state.cardno, this.state.expdate, this.state.cardno);
                // } catch (error) {
                //     console.log(error);
                // }




            })
            .catch(console.log);
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        // console.log(event.target.name);
        // console.log(event.target.value);
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

