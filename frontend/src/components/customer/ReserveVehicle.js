import React from 'react';
import {Button} from "react-bootstrap";
import CustomerNavbar from "./CustomerNavbar";
import Form from "react-bootstrap/Form";
import {createCustomer, createReserve} from "../Fetch";

class ReserveVehicle extends React.Component {
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

    newCustomer = async () => {
        try {
            // Register customer
            const customerResponse = await this.registerCustomer();
            // Reserve
            const dlicense = customerResponse.dlicense;
            const reserveResponse = await this.registerReservation(dlicense);
            const {city, location, fromdate, todate, fromtime, totime, vtname} = this.props.match.params;
            const confno = reserveResponse.confno;
            window.location.href = `/customer/reserve/success/${city}/${location}/${fromdate}/${todate}/${fromtime}/${totime}/${vtname}/${confno}`;
        } catch (e) {
            console.log(e);
        }

    };

    returningCustomer = async () => {
        try {
            const dlicense = document.getElementById("returning-customer-dlicense").value;
            const reserveResponse = await this.registerReservation(dlicense);
            const {city, location, fromdate, todate, fromtime, totime, vtname} = this.props.match.params;
            const confno = reserveResponse.confno;
            window.location.href = `/customer/reserve/success/${city}/${location}/${fromdate}/${todate}/${fromtime}/${totime}/${vtname}/${confno}`;
        } catch (e) {
            console.log(e);
        }
    };

    registerCustomer = async () => {
        const name = document.getElementById("name").value;
        const cellphone = document.getElementById("cellphone").value;
        const address = document.getElementById("address").value;
        const dlicense = document.getElementById("new-customer-dlicense").value;

        return await createCustomer(name, cellphone, address, dlicense);
    };

    registerReservation = async (dlicense) => {
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
        const {city, location, fromdate, todate, fromtime, totime, vtname} = this.props.match.params;

        return (
            <React.Fragment>
                <CustomerNavbar/>
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
                    <div className={"row"} style={customerFormStyle}>
                        <div className={"col-sm"}>
                            <Form>
                                <h3>New Customer</h3>
                                <Form.Group controlId="name">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Full Name"/>
                                </Form.Group>
                                <Form.Group controlId="cellphone">
                                    <Form.Label>Cellphone</Form.Label>
                                    <Form.Control type="tel" placeholder="Enter Cellphone"/>
                                </Form.Group>
                                <Form.Group controlId="address">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="tel" placeholder="Enter Address"/>
                                </Form.Group>
                                <Form.Group controlId="new-customer-dlicense">
                                    <Form.Label>Driver's License</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Driver's license"/>
                                </Form.Group>
                                <Button variant="primary" type="button" onClick={this.newCustomer}>
                                    Register & Reserve
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
                                        Reserve
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

export default ReserveVehicle;
