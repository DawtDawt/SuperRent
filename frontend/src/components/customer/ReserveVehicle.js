import React from 'react';
import {Button} from "react-bootstrap";
import {useParams} from "react-router-dom";
import CustomerNavbar from "./CustomerNavbar";
import Form from "react-bootstrap/Form";

class ReserveVehicle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "img-Economy": "https://www.avis.ca/content/dam/cars/l/2016/chevrolet/2016-chevrolet-spark-ev-hatchback-black.png",
            "img-Compact": "https://www.avis.ca/content/dam/cars/l/2016/chevrolet/2016-chevrolet-sonic-lt-at-sedan-side-view-black.png",
            "img-Standard": "https://www.avis.ca/content/dam/cars/l/2016/hyundai/2016-hyundai-sonata-limited-sedan-venetian-red.png",
            "img-Full-size": "https://www.avis.ca/content/dam/cars/l/2016/chevrolet/2016-chevrolet-impala-2lt-sedan-black.png",
            "img-SUV": "https://www.avis.ca/content/dam/cars/l/2017/jeep/2017-jeep-grand-cherokee-limited-suv-black.png",
            "img-Truck": "https://www.avis.ca/content/dam/cars/l/2015/ford/2015-ford-f-150-xlt-pick-up-side-view-black.png",
            "img-Mid-size": "https://www.avis.ca//content/dam/cars/l/2018/hyundai/2018-hyundai-elantra-limited-sedan-black.png",
        };
    }

    handleNewCustomerClick = () => {
        // Register customer

        // Reserve
        const {city, location, fromdate, todate, fromtime, totime, vtname} = this.props.match.params;
        const dlicense = document.getElementById("new-customer-dlicense").value;
        console.log(dlicense);
    };

    handleReturningCustomerClick = async () => {
        const {city, location, fromdate, todate, fromtime, totime, vtname} = this.props.match.params;
        const dlicense = document.getElementById("returning-customer-dlicense").value;
        console.log(dlicense);
        // TODO
        const response = await fetch("http://localhost:8080/reserve/create", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                vtname,
                dlicense,
                location,
                city,
                fromdate,
                todate,
                fromtime,
                totime
            })
        });
        const content = await response.json();
    };


    render() {
        const style = {
            margin: "100px",
            padding: "30px 20px",
            border: "1px solid transparent",
            borderRadius: "35px",
            background: "#FFFFFF",
            boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
            transition: "all 0.3s cubic-bezier(.25,.8,.25,1)"
        };
        const textStyle = {
            textAlign: "center"
        };
        const customerFormStyle = {
            margin: "40px 0 0 0",
            textAlign: "left"
        };
        const vertLineStyle = {
            margin: "10px 30px",
            borderLeft: "1px solid grey",
            height: "500px"
        };
        const {city, location, fromdate, todate, fromtime, totime, vtname} = this.props.match.params;
        console.log(this.props.match.params);

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
                        <div className={"col-sm"} style={textStyle}>
                            <img src={this.state["img-" + vtname]} height={"100px"}/>
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
                                <Form.Group controlId="new-customer-dlicense">
                                    <Form.Label>Driver's License</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Driver's license"/>
                                </Form.Group>
                                <Form.Group controlId="cellphone">
                                    <Form.Label>Cellphone</Form.Label>
                                    <Form.Control type="tel" placeholder="Enter Cellphone"/>
                                </Form.Group>
                                <Form.Group controlId="address">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="tel" placeholder="Enter Address"/>
                                </Form.Group>
                                <Button variant="primary" type="button" onClick={this.handleNewCustomerClick}>
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
                                <Button variant="primary" type="button" onClick={this.handleReturningCustomerClick}>
                                    Reserve
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ReserveVehicle;
