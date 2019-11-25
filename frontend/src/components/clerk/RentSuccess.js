import React from 'react';
import ClerkNavbar from "./ClerkNavbar";

class RentSuccess extends React.Component {
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

        // eslint-disable-next-line
        const {city, location, fromdate, todate, fromtime, totime, vtname, confNo, rid} = this.props.match.params;

        return (
            <React.Fragment>
                <ClerkNavbar/>
                <div className="wrapper">
                    <div style={style}>
                        <div>
                            <h2>Rent Successful</h2>
                        </div>
                        <div className={"row"} style={{margin: "20px 0"}}>
                            <div className={"col-sm"} style={{textAlign: "right"}}>
                                <h5>Rent ID: </h5>
                                <h5>Vehicle Type: </h5>
                                <h5>Vehicle License: </h5>
                                <h5>Driver's License: </h5>
                                <h5>Location: </h5>
                                <h5>City: </h5>
                                <h5>Rent Date: </h5>
                                <h5>Return Date: </h5>
                            </div>
                            <div className={"col-sm"} style={{textAlign: "left"}}>
                                <h5>{this.props.match.params.rid}</h5>
                                <h5>{this.props.match.params.vtname}</h5>
                                <h5>{this.props.match.params.vlicense}</h5>
                                <h5>{this.props.match.params.dlicense}</h5>
                                <h5>{this.props.match.params.location}</h5>
                                <h5>{this.props.match.params.city}</h5>
                                <h5>{this.props.match.params.fromdate} {this.props.match.params.fromtime}</h5>
                                <h5>{this.props.match.params.todate} {this.props.match.params.totime}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default RentSuccess;
