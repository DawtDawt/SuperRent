import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import CustomerNavbar from "./CustomerNavbar";
import Form from "react-bootstrap/Form";

class ReserveSuccess extends React.Component {
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

    render() {
        const btnStyle = {
            margin: "10px",
        };
        const style = {
            width: "85vw",
            padding: "30px",
            border: "1px solid transparent",
            borderRadius: "35px",
            background: "#FFFFFF",
            boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
            transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
            verticalAlign: "center",
        };

        const rowStyle = {
            margin: "30px",
            textAlign: "left",
        };

        const {city, location, fromdate, todate, fromtime, totime, vtname, confNo} = this.props.match.params;

        return (
            <React.Fragment>
                <CustomerNavbar/>
                <div className="wrapper">
                    <div style={style}>
                        <div>
                            <h1>Reservation successful</h1>
                        </div>
                        <div className={"row"} style={{margin: "30px"}}>
                            <div className={"col-sm"} style={{textAlign: "right"}}>
                                <h5>Pick-up Location</h5>
                                <h3>{location} - {city}</h3>
                                <h5>From {fromdate} {fromtime} <br/> To {todate} {totime} <br/> Confirmation
                                    Number: {confNo}</h5>
                            </div>
                            <div className={"col-sm"} style={{textAlign: "center"}}>
                                <img src={this.state["img-" + vtname]} height={"100px"}/>
                                <h5>{vtname}</h5>
                            </div>
                        </div>
                        <div>
                            <Link to="/customer">
                                <Button variant={"primary"} size={"lg"} style={btnStyle}>Go back to home page</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ReserveSuccess;
