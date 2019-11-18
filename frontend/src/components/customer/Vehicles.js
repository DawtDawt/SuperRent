import React from 'react';
import ReactDOM from 'react-dom';
import CustomerNavbar from "./CustomerNavbar";
import VehicleFilters from "./VehicleFilters";
import VehicleTable from "./VehicleTable";

class Vehicles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSubmit = (state) => {
        const query = this.getQuery(state);
        fetch("http://localhost:8080/vehicle/get/?" + query)
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                    this.setState({vehicles: []});
                } else {
                    this.setState({vehicles: data.data});
                }
                ReactDOM.render(<VehicleTable vehicles={this.state.vehicles}/>, document.getElementById("table"))
            })
            .catch(console.log);
    };

    getQuery = (state) => {
        const body = {};
        if (state.location) {
            body["city"] = state.location.split(" - ")[0];
            body["location"] = state.location.split(" - ")[1];
        }
        if (state.startDate && state.endDate) {
            body["fromdate"] = state.startDate.format("YYYY-MM-DD");
            body["todate"] = state.endDate.format("YYYY-MM-DD");
        }
        if (state.fromtime && state.totime) {
            body["fromtime"] = state.fromtime.split;
            body["totime"] = state.totime.split;
        }
        if (state.vtname) {
            body["vtname"] = state.vtname;
        }
        const query = Object.keys(body).map(function (key) {
            return key + '=' + encodeURIComponent(body[key]);
        }).join('&');
        return query;
    };

    render() {
        const style = {
            margin: "100px",
            padding: "30px 0",
            border: "1px solid transparent",
            borderRadius: "35px",
            background: "#FFFFFF",
            boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
            transition: "all 0.3s cubic-bezier(.25,.8,.25,1)"
        };

        return (
            <React.Fragment>
                <CustomerNavbar activeLink={"vehicles"}/>
                <div className={" "} style={style}>
                    <VehicleFilters handleSubmit={this.handleSubmit}/>
                    <div id={"table"}></div>
                </div>
            </React.Fragment>
        )
    }
}


export default Vehicles;