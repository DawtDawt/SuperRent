import React from 'react';
import ClerkNavbar from "./ClerkNavbar";
import RentSearchConsole from "./RentSearchConsole";
import ReturnSearchConsole from "./ReturnSearchConsole";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ReportSearchConsole from "./ReportSearchConsole";

class Clerk extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CustomerSelection: [],
            RentSelection: [],
            BranchSelection: [],
        };
    }


    componentDidMount() {
        fetch("http://localhost:8080/table/reservation")
            .then(response => {
                return response.json();
            })
            .then(data => {
                const customers = [];
                data.data.forEach((person) => {
                    const personLicense = person.dlicense;
                    if (!customers.includes(personLicense)) {
                        customers.push(personLicense);
                    }
                });
                this.setState({CustomerSelection: customers});
            })
            .catch(console.log);
    }




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
                        <Tab eventKey="Rent" title="Rent">
                            <RentSearchConsole CustomerSelection={this.state.CustomerSelection}/>
                        </Tab>
                        <Tab eventKey="Return" title="Return">
                            <ReturnSearchConsole RentSelection={this.state.RentSelection}/>
                        </Tab>
                        <Tab eventKey="Report" title="Report">
                            <ReportSearchConsole BranchSelection={this.state.BranchSelection}/>
                        </Tab>
                    </Tabs>
                </div>
            </React.Fragment>
        )
    }
}



export default Clerk;