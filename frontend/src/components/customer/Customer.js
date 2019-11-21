import React from 'react';
import CustomerNavbar from "./CustomerNavbar";
import ReserveSearchConsole from "./ReserveSearchConsole";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import BrowseSearchConsole from "./BrowseSearchConsole";

class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicles: [],
            branchSelection: []
        };
    }

    componentDidMount() {
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
            transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
            textAlign: "center"
        };

        return (
            <React.Fragment>
                <CustomerNavbar/>
                <div style={style}>
                    <Tabs justify defaultActiveKey="Reserve" id="uncontrolled-tab-example">
                        <Tab eventKey="Reserve" title="Reserve">
                            <ReserveSearchConsole times={this.generateTimes()} branchSelection={this.state.branchSelection}/>
                        </Tab>
                        <Tab eventKey="Vehicle" title="Browse">
                            <BrowseSearchConsole times={this.generateTimes()} branchSelection={this.state.branchSelection}/>
                        </Tab>
                    </Tabs>
                </div>
            </React.Fragment>
        )
    }
}


export default Customer;