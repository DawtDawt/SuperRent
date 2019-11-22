import React from 'react';
import ClerkNavbar from "./ClerkNavbar";
import RentSearchConsole from "./RentSearchConsole";
import ReturnSearchConsole from "./ReturnSearchConsole";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ReportSearchConsole from "./ReportSearchConsole";
import RentForNewSearchConsole from "./RentForNewSearchConsole";

class Clerk extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confNoSelection: [],
            rentIDSelection: [],
            branchSelection: [],
        };
    }

    componentDidMount() {
        // Get reservation confirmation numbers
        fetch("http://localhost:8080/table/reservation")
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (!data.error) {
                    this.setState({confNoSelection: data.data});
                }
            })
            .catch(console.log);

        // Get rent IDs
        fetch("http://localhost:8080/table/rental")
            .then(response => {return response.json()})
            .then(data => {
                if (!data.error) {
                    this.setState({rentIDSelection: data.data});
                }
            })
            .catch(console.log);

        // Get branch locations
        fetch("http://localhost:8080/table/vehicle")
            .then(response => {
                return response.json();
            })
            .then(data => {
                const branches = [];
                data.data.forEach((car) => {
                    const branchName = car.city + " - " + car.location;
                    if (!branches.includes(branchName)) {
                        branches.push(branchName);
                    }
                });
                this.setState({branchSelection: branches});
            })
            .catch(console.log);
    }


    generateTimes = () => {
        const times = [];
        times.push("12:00 AM", "12:30 AM");
        for (let i = 1; i < 12; i++) {
            if (i <= 9) {
                times.push("0" + String(i) + ":00 AM");
                times.push("0" + String(i) + ":30 AM");
            } else {
                times.push(String(i) + ":00 AM");
                times.push(String(i) + ":30 AM");
            }

        }
        times.push("12:00 PM", "12:30PM");
        for (let i = 1; i < 12; i++) {
            if (i <= 9) {
                times.push("0" + String(i) + ":00 PM");
                times.push("0" + String(i) + ":30 PM");
            } else {
                times.push(String(i) + ":00 PM");
                times.push(String(i) + ":30 PM");
            }
        }
        return times;
    };


    render() {
        const style = {
            margin: "100px",
            padding: "20px 20px",
            border: "1px solid transparent",
            borderRadius: "35px",
            background: "#FFFFFF",
            boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
            transition: "all 0.3s cubic-bezier(.25,.8,.25,1)"
        };

        return (
            <React.Fragment>
                <ClerkNavbar/>
                <div style={style}>
                    <Tabs justify defaultActiveKey="Rent" id="uncontrolled-tab-example">
                        <Tab eventKey="Rent" title="Rent For Customers That Have A Reservation">
                            <RentSearchConsole confNoSelection={this.state.confNoSelection}/>
                        </Tab>
                        <Tab eventKey="RentNew" title="Rent For Customers That Does Not Have A Reservation">
                            <RentForNewSearchConsole times={this.generateTimes()} confNoSelection={this.state.branchSelection} branchSelection={this.state.branchSelection}/>
                        </Tab>
                        <Tab eventKey="Return" title="Return">
                            <ReturnSearchConsole rentIDSelection={this.state.rentIDSelection}/>
                        </Tab>
                        <Tab eventKey="Report" title="Report">
                            <ReportSearchConsole branchSelection={this.state.branchSelection}/>
                        </Tab>
                    </Tabs>
                </div>
            </React.Fragment>
        )
    }
}



export default Clerk;