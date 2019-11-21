import React from 'react';
import {Button, ButtonGroup, Dropdown, DropdownButton, DropdownItem} from "react-bootstrap";
import {DateRangePicker} from 'react-dates';
import ReactDOM from "react-dom";
import BrowseTable from "./BrowseTable";
import Spinner from "react-bootstrap/Spinner";


class BrowseSearchConsole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vtnameSelection: ['Economy', 'Compact', 'Mid-size', 'Standard', 'Full-size', 'SUV', 'Truck'],
        };
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

                ReactDOM.render(
                    <div>
                        <div style={{margin: "20px"}}>
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>
                    </div>
                    , document.getElementById("browse-result"));

                setTimeout(() => {
                    ReactDOM.render(<BrowseTable vehicles={this.state.vehicles}/>, document.getElementById("browse-result"));
                }, 200);



            })
            .catch(console.log);
    };


    getQuery = (state) => {
        const body = {};
        if (state["browse-location"]) {
            body["city"] = state["browse-location"].split(" - ")[0];
            body["location"] = state["browse-location"].split(" - ")[1];
        }
        if (state["browse-startDate"] && state["browse-endDate"]) {
            body["fromdate"] = state["browse-startDate"].format("YYYY-MM-DD");
            body["todate"] = state["browse-endDate"].format("YYYY-MM-DD");
        }
        if (state["browse-fromtime"] && state["browse-totime"]) {
            body["fromtime"] = state["browse-fromtime"];
            body["totime"] = state["browse-totime"];
        }
        if (state["browse-vtname"]) {
            body["vtname"] = state["browse-vtname"]
        }
        const query = Object.keys(body).map(function (key) {
            return key + '=' + encodeURIComponent(body[key]);
        }).join('&');
        return query;
    };

    handleAnySelection = (event) => {
        const btnName = event.target.className.split(" ")[0];
        document.getElementById(btnName).innerText = event.target.value;
        document.getElementById(btnName).className = document.getElementById(btnName).className.split(" ").filter((elem) => {
            return elem !== "btn-success";
        }).join(" ");
        this.setState({[btnName]: undefined});
        console.log(event.target.value);
    };

    handleChange = (event) => {
        const btnName = event.target.className.split(" ")[0];
        document.getElementById(btnName).innerText = event.target.value;
        document.getElementById(btnName).className = document.getElementById(btnName).className.split(" ").filter((elem) => {
            return elem !== "btn-outline-primary";
        }).join(" ");
        document.getElementById(btnName).className = document.getElementById(btnName).className.concat(" btn-primary");
        this.setState({[btnName]: event.target.value});
    };

    render() {
        const timeStyle = {
            width: "180px",
            margin: "5px"
        };
        const dropdownStyle = {
            maxHeight: "205px",
            // width: "300px",
            overflowY: "scroll",
        };
        const locationStyle = {
            margin: "5px",
            width: "350px",
        };
        const locationDropdownStyle = {
            maxHeight: "205px",
            width: "300px",
            overflowY: "scroll",
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
                    <DropdownButton title={"Any Location"} size={"lg"} id={"browse-location"} style={locationStyle}
                                    as={ButtonGroup} variant={"outline-primary"} drop={'down'}>
                        <DropdownItem key={"-1"} value={"Any Location"} as={"button"} onClick={this.handleAnySelection}
                                      className={"browse-location"}> Any Location</DropdownItem>
                        <Dropdown.Divider/>
                        <div style={dropdownStyle}>
                            {this.props.branchSelection.map((elem, idx) => {
                                return <DropdownItem key={idx} value={elem} as={"button"}
                                                     className={"browse-location"}
                                                     onClick={this.handleChange}
                                                     style={locationDropdownStyle}>{elem}</DropdownItem>;
                            })}
                        </div>
                    </DropdownButton>
                    <DateRangePicker
                        startDate={this.state["reserve-startDate"]} // momentPropTypes.momentObj or null,
                        startDateId="reserve-startDate" // PropTypes.string.isRequired,
                        endDate={this.state["reserve-endDate"]} // momentPropTypes.momentObj or null,
                        endDateId="reserve-endDate" // PropTypes.string.isRequired,
                        onDatesChange={({startDate, endDate}) => this.setState({
                            "reserve-startDate": startDate,
                            "reserve-endDate": endDate
                        })} // PropTypes.func.isRequired,
                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => this.setState({focusedInput})} // PropTypes.func.isRequired,
                    />
                    <div>
                        <DropdownButton title={"Any Start Time"}
                                        value={this.state["browse-fromtime"]}
                                        size={"lg"}
                                        variant={"outline-primary"}
                                        as={ButtonGroup} id={"browse-fromtime"} style={timeStyle}>
                            <DropdownItem key={"-1"} value={"Any Start Time"} as={"button"}
                                          onClick={this.handleAnySelection}
                                          className={"browse-fromtime"}> Any Start Time</DropdownItem>
                            <Dropdown.Divider/>
                            <div style={dropdownStyle}>
                                {this.props.times.map((elem, idx) => {
                                    return <DropdownItem key={idx} value={elem} as={"button"}
                                                         onClick={this.handleChange}
                                                         className={"browse-fromtime"}>{elem}</DropdownItem>;
                                })}
                            </div>
                        </DropdownButton>
                        <DropdownButton title={"Any End Time"}
                                        value={this.state["browse-totime"]}
                                        size={"lg"}
                                        variant={"outline-primary"}
                                        as={ButtonGroup} id={"browse-totime"} style={timeStyle}>
                            <div style={dropdownStyle}>
                                <DropdownItem key={"-1"} value={"Any End Time"} as={"button"}
                                              onClick={this.handleAnySelection}
                                              className={"browse-totime"}> Any End Time</DropdownItem>
                                <Dropdown.Divider/>
                                {this.props.times.map((elem, idx) => {
                                    return <DropdownItem key={idx} value={elem} as={"button"}
                                                         onClick={this.handleChange}
                                                         className={"browse-totime"}>{elem}</DropdownItem>;
                                })}
                            </div>
                        </DropdownButton>
                        <DropdownButton title={"Any Car Type"}
                                        value={this.state["browse-vtname"]}
                                        size={"lg"}
                                        variant={"outline-primary"}
                                        as={ButtonGroup} id={"browse-vtname"} style={timeStyle}>
                            <div style={dropdownStyle}>
                                <DropdownItem key={"-1"} value={"Any Car Type"} as={"button"}
                                              onClick={this.handleAnySelection}
                                              className={"browse-vtname"}>Any Car Type</DropdownItem>
                                <Dropdown.Divider/>
                                {this.state.vtnameSelection.map((elem, idx) => {
                                    return <DropdownItem key={idx} value={elem} as={"button"}
                                                         onClick={this.handleChange}
                                                         className={"browse-vtname"}>{elem}</DropdownItem>;
                                })}
                            </div>
                        </DropdownButton>
                    </div>
                </div>
                <div style={{textAlign: "center"}}>
                    <Button size={"lg"} onClick={() => this.handleSubmit(this.state)}
                            style={{margin: "10px 0"}}>Search</Button>
                </div>
                <div id="browse-result"></div>
            </React.Fragment>
        )
    }
}


export default BrowseSearchConsole;