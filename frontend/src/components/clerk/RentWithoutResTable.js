import React from 'react';
import {Button, Fade, Table} from "react-bootstrap";
import moment from "moment";


class RentWithoutResTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            vtnames: [],
            "img-Economy": "https://www.avis.ca/content/dam/cars/l/2016/chevrolet/2016-chevrolet-spark-ev-hatchback-black.png",
            "img-Compact": "https://www.avis.ca/content/dam/cars/l/2016/chevrolet/2016-chevrolet-sonic-lt-at-sedan-side-view-black.png",
            "img-Standard": "https://www.avis.ca/content/dam/cars/l/2016/hyundai/2016-hyundai-sonata-limited-sedan-venetian-red.png",
            "img-Full-size": "https://www.avis.ca/content/dam/cars/l/2016/chevrolet/2016-chevrolet-impala-2lt-sedan-black.png",
            "img-SUV": "https://www.avis.ca/content/dam/cars/l/2017/jeep/2017-jeep-grand-cherokee-limited-suv-black.png",
            "img-Truck": "https://www.avis.ca/content/dam/cars/l/2015/ford/2015-ford-f-150-xlt-pick-up-side-view-black.png",
            "img-Mid-size": "https://www.avis.ca//content/dam/cars/l/2018/hyundai/2018-hyundai-elantra-limited-sedan-black.png",
        };
    }

    handleClick = (event) => {
        // Get data
        const vlicense = document.getElementById("table-vlicense").innerText;
        const vtname = document.getElementById("table-vtname").innerText;
        const city = document.getElementById("rentwo-location").innerText.split(" - ")[0];
        const location = document.getElementById("rentwo-location").innerText.split(" - ")[1];
        const fromdate = moment(document.getElementById("rentwo-fromdate").value).format("YYYY-MM-DD");
        const todate = moment(document.getElementById("rentwo-todate").value).format("YYYY-MM-DD");
        const fromtime = document.getElementById("rentwo-fromtime").innerText;
        const totime = document.getElementById("rentwo-totime").innerText;

        window.location.href = `/clerk/rent/${city}/${location}/${fromdate}/${todate}/${fromtime}/${totime}/${vtname}/${vlicense}`;
    };

    render() {
        const divStyle = {
            textAlign: "center",
            margin: "20px 0",
        };

        let table;
        if (this.props.vehicles.length > 0) {
            table =
                <React.Fragment>
                    <h5> {this.props.vehicles.length} Vehicle(s) available </h5>
                    <Table bordered hover>
                        <thead>
                        <tr>
                            <th style={{width: "15%"}}>License</th>
                            <th style={{width: "15%"}}>Make</th>
                            <th style={{width: "15%"}}>Model</th>
                            <th style={{width: "10%"}}>Year</th>
                            <th style={{width: "10%"}}>Color</th>
                            <th style={{width: "15%"}}>Vehicle Type</th>
                            <th style={{width: "20%"}}>Location</th>
                            <th style={{width: "15%"}}>City</th>
                            <th style={{width: "15%"}}>Rent</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.vehicles.map((car) => {
                            return (
                                <tr key={car.vlicense}>
                                    <td id={"table-vlicense"}>{car.vlicense}</td>
                                    <td>{car.make}</td>
                                    <td>{car.model}</td>
                                    <td>{car.year}</td>
                                    <td>{car.color.toUpperCase()}</td>
                                    <td id={"table-vtname"}>{car.vtname}</td>
                                    <td>{car.location}</td>
                                    <td>{car.city}</td>
                                    <td> <Button variant={"success"} size={"lg"} id={`hello`}
                                                 onClick={this.handleClick}>
                                        Rent
                                    </Button></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </React.Fragment>
        } else {
            table = <h5>No vehicle matching the criteria is available</h5>;
        }

        return (
            <Fade appear={true} in={true}>
                <div style={divStyle}>
                    {table}
                </div>
            </Fade>
        )
    }
}


export default RentWithoutResTable;
