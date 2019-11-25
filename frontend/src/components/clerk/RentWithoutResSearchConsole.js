import React from 'react';
import {Button, ButtonGroup, Dropdown, DropdownButton, DropdownItem} from "react-bootstrap";
import {getVehicle} from "../Fetch";
import {DateRangePicker} from "react-dates";
import RentWithoutResTable from "./RentWithoutResTable";
import {renderOnDiv} from "../Util";


class RentWithoutResSearchConsole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vtnameSelection: ['Economy', 'Compact', 'Mid-size', 'Standard', 'Full-size', 'SUV', 'Truck'],
        };
    }


    handleSubmit = async (state) => {
        const body = this.getBody(state);
        if (body.vtname === "Any Car Type") {
            delete body.vtname;
        }

        if (body.city && body.location && body.fromdate && body.todate && body.fromtime && body.totime) {
            getVehicle(body)
                .then(data => {
                    if (data.error) {
                        console.log(data.error);
                        this.setState({vehicles: []});
                    } else {
                        this.setState({vehicles: data.data});
                    }

                    renderOnDiv("rentwo-result", <RentWithoutResTable vehicles={this.state.vehicles}/>);

                })
                .catch(console.log);
        } else {
            alert("Missing required information");
        }

    };


    getBody = (state) => {
        const body = {};
        if (state["rentwo-location"]) {
            body["city"] = state["rentwo-location"].split(" - ")[0];
            body["location"] = state["rentwo-location"].split(" - ")[1];
        }
        if (state["rentwo-fromdate"] && state["rentwo-todate"]) {
            body["fromdate"] = state["rentwo-fromdate"].format("YYYY-MM-DD");
            body["todate"] = state["rentwo-todate"].format("YYYY-MM-DD");
        }
        if (state["rentwo-fromtime"] && state["rentwo-totime"]) {
            body["fromtime"] = state["rentwo-fromtime"];
            body["totime"] = state["rentwo-totime"];
        }
        if (state["rentwo-vtname"]) {
            body["vtname"] = state["rentwo-vtname"]
        }

        return body;
    };

    handleChange = (event) => {
        const btnName = event.target.className.split(" ")[0];
        document.getElementById(btnName).innerText = event.target.value;
        this.setState({[btnName]: event.target.value});
    };

    render() {
        const locationDropdownStyle = {
            maxHeight: "205px",
            width: "300px",
            overflowY: "scroll",
        };

        const locationStyle = {
            margin: "5px",
            width: "350px",
        };

        const dropdownStyle = {
            maxHeight: "205px",
            overflowY: "scroll",
        };

        const timeStyle = {
            width: "180px",
            margin: "5px"
        };

        const flexStyle = {
            margin: "20px 0 0 0",
            minWidth: "100%",
            display: "flex", flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center"
        };
        return (
            <React.Fragment>
                <div style={flexStyle}>

                    <DropdownButton title={"Location"} size={"lg"} id={"rentwo-location"} style={locationStyle}
                                    as={ButtonGroup}
                                    variant={"outline-primary"}
                                    drop={'down'}>
                        <div style={dropdownStyle}>
                            {this.props.branchSelection.map((elem, idx) => {
                                return <DropdownItem key={idx} value={elem} as={"button"}
                                                     className={"rentwo-location"}
                                                     onClick={this.handleChange}
                                                     style={locationDropdownStyle}>{elem}</DropdownItem>;
                            })}
                        </div>
                    </DropdownButton>
                    <DateRangePicker
                        startDate={this.state["rentwo-fromdate"]} // momentPropTypes.momentObj or null,
                        startDateId="rentwo-fromdate" // PropTypes.string.isRequired,
                        endDate={this.state["rentwo-todate"]} // momentPropTypes.momentObj or null,
                        endDateId="rentwo-todate" // PropTypes.string.isRequired,
                        onDatesChange={({startDate, endDate}) => this.setState({
                            "rentwo-fromdate": startDate,
                            "rentwo-todate": endDate
                        })} // PropTypes.func.isRequired,
                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => this.setState({focusedInput})} // PropTypes.func.isRequired,
                    />
                    <DropdownButton title={"Start Time"}
                                    value={this.state["rentwo-fromtime"]}
                                    size={"lg"}
                                    variant={"outline-primary"}
                                    as={ButtonGroup} id={"rentwo-fromtime"} style={timeStyle}>
                        <Dropdown.Divider/>
                        <div style={dropdownStyle}>
                            {this.props.times.map((elem, idx) => {
                                return <DropdownItem key={idx} value={elem} as={"button"}
                                                     onClick={this.handleChange}
                                                     className={"rentwo-fromtime"}>{elem}</DropdownItem>;
                            })}
                        </div>
                    </DropdownButton>
                    <DropdownButton title={"End Time"}
                                    value={this.state["rentwo-totime"]}
                                    size={"lg"}
                                    variant={"outline-primary"}
                                    as={ButtonGroup} id={"rentwo-totime"} style={timeStyle}>
                        <div style={dropdownStyle}>
                            <Dropdown.Divider/>
                            {this.props.times.map((elem, idx) => {
                                return <DropdownItem key={idx} value={elem} as={"button"}
                                                     onClick={this.handleChange}
                                                     className={"rentwo-totime"}>{elem}</DropdownItem>;
                            })}
                        </div>
                    </DropdownButton>
                    <DropdownButton title={"Any Car Type"}
                                    value={this.state["rentwo-vtname"]}
                                    size={"lg"}
                                    variant={"outline-primary"}
                                    as={ButtonGroup} id={"rentwo-vtname"} style={timeStyle}>
                        <div style={dropdownStyle}>
                            <DropdownItem key={"-1"} value={"Any Car Type"} as={"button"}
                                          onClick={this.handleChange}
                                          className={"rentwo-vtname"}>Any Car Type</DropdownItem>
                            <Dropdown.Divider/>
                            {this.state.vtnameSelection.map((elem, idx) => {
                                return <DropdownItem key={idx} value={elem} as={"button"}
                                                     onClick={this.handleChange}
                                                     className={"rentwo-vtname"}>{elem}</DropdownItem>;
                            })}
                        </div>
                    </DropdownButton>
                </div>
                <div style={{textAlign: "center"}}>
                    <Button size={"lg"} onClick={() => this.handleSubmit(this.state)}
                            style={{margin: "10px 0"}}>Search</Button>
                </div>
                <div id="rentwo-result"></div>
            </React.Fragment>
        )
    }
}


export default RentWithoutResSearchConsole;

