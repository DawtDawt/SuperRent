import React from 'react';
import {Button, ButtonGroup, DropdownButton, DropdownItem} from "react-bootstrap";
import ReturnTable from "./ReturnTable";
import ReactDOM from "react-dom";
import moment from "moment";

class ReturnSearchConsole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.ResultTable = React.createRef();
    }

    handleSubmit = async (event) => {
        if (this.state.rentID) {
            try {
                const body = {
                    rid: this.state.rentID,
                    date: moment().format("YYYY-MM-DD"),
                    time: moment().format("LT"),
                    odometer: 1300,
                    fulltank: true,
                    value: this.calculateCost()
                };
                const response = await fetch("http://localhost:8080/return/create", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                });

                const content = await response.json();

                if (content.error) {
                    alert(content.error);
                    console.log(content.error);
                    throw Error(content.error);
                }

                ReactDOM.render(<ReturnTable ref={this.ReportTable}
                                             rentDetail={body}/>, document.getElementById("return-result"));
            } catch (e) {
                console.log(e);
            }

        }
    };

    // TODO or should this be done in backend?
    // Calculates the cost of the rental based on rid
    calculateCost() {
        return 0;
    }

    handleChange = (event) => {
        document.getElementById("rentID").innerText = event.target.value;
        document.getElementById("rentID").className = document.getElementById("rentID").className.concat(" btn-success");
        document.getElementById("rentID").className = document.getElementById("rentID").className.split(" ").filter((elem) => {
            return elem !== "btn-outline-primary";
        }).join(" ");
        this.setState({rentID: event.target.value});
        console.log(event.target.value);
    };

    render() {

        const locationStyle = {
            margin: "5px",
            width: "350px",
        };

        const dropdownStyle = {
            width: "350px",
            overflowY: "scroll"
        };

        const locationDropdownStyle = {
            maxHeight: "350px",
            overflowY: "scroll",
        };

        const consoleStyle = {
            margin: "20px",
            padding: "20px",
            textAlign: "center"
        };

        return (
            <React.Fragment>
                <div style={consoleStyle}>
                    <DropdownButton title={"Rent ID"} size={"lg"} id={"rentID"} style={locationStyle}
                                    as={ButtonGroup}
                                    variant={"outline-primary"}
                                    drop={'down'}>
                        <div style={dropdownStyle}>
                            {this.props.rentIDSelection.map((elem, idx) => {
                                return <DropdownItem key={idx} value={elem.confno} as={"button"}
                                                     className={"reserve-location"}
                                                     onClick={this.handleChange}
                                                     style={locationDropdownStyle}>{elem.confno}</DropdownItem>;
                            })}
                        </div>
                    </DropdownButton>
                    <Button size={"lg"} onClick={this.handleSubmit}>Return Vehicle</Button>
                </div>
                <div id={"return-result"}></div>
            </React.Fragment>
        )
    }
}


export default ReturnSearchConsole;

