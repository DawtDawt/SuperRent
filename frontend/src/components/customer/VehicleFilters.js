import React from 'react';
import {Button, ButtonGroup, DropdownButton, DropdownItem} from "react-bootstrap";
import {DateRangePicker} from 'react-dates';
import Dropdown from "react-bootstrap/Dropdown";


class VehicleFilters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            branchSelection: [],
            vtnameSelection: ['Economy', 'Compact', 'Mid-size', 'Standard', 'Full-size', 'SUV', 'Truck'],
        };
    }

    componentDidMount() {
        document.getElementById("startDate").placeholder = "Any Date";
        document.getElementById("endDate").placeholder = "Any Date";
        fetch("http://localhost:8080/table/vehicle")
            .then(response => {
                return response.json();
            })
            .then(data => {
                const branches = [];
                data.data.forEach((car) => {
                    branches.push(car.city + " - " + car.location)
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

    handleChange = (event) => {
        const btnName = event.target.className.split(" ")[0];
        document.getElementById(btnName).innerText = event.target.value;
        document.getElementById(btnName).className = document.getElementById(btnName).className.concat(" btn-success");
        this.setState({[btnName]: event.target.value});
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

    render() {
        const btnStyle = {
            margin: "5px",
            width: "165px",
        };
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
            minWidth: "100%",
            display: "flex", flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center"
        };
        return (
            <React.Fragment>
                <div style={flexStyle}>
                    <DropdownButton title={"Any Location"} size={"lg"} id={"location"} style={locationStyle}
                                    as={ButtonGroup} drop={'down'}>
                        <DropdownItem key={"-1"} value={"Any Location"} as={"button"} onClick={this.handleAnySelection}
                                      className={"location"}>Any Location</DropdownItem>
                        <Dropdown.Divider/>
                        <div style={dropdownStyle}>
                            {this.state.branchSelection.map((elem, idx) => {
                                return <DropdownItem key={idx} value={elem} as={"button"}
                                                     className={"location"}
                                                     onClick={this.handleChange}
                                                     style={locationDropdownStyle}>{elem}</DropdownItem>;
                            })}
                        </div>
                    </DropdownButton>
                    <DateRangePicker
                        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                        startDateId="startDate" // PropTypes.string.isRequired,
                        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                        endDateId="endDate" // PropTypes.string.isRequired,
                        onDatesChange={({startDate, endDate}) => this.setState({
                            startDate,
                            endDate
                        })} // PropTypes.func.isRequired,
                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => this.setState({focusedInput})} // PropTypes.func.isRequired,
                    />
                    <div>
                        <DropdownButton title={"Any Start Time"}
                                        value={this.state.fromtime}
                                        size={"lg"}
                                        as={ButtonGroup} id={"fromtime"} style={timeStyle}>
                            <DropdownItem key={"-1"} value={"Any Start Time"} as={"button"}
                                          onClick={this.handleAnySelection}
                                          className={"fromtime"}>Any Start Time</DropdownItem>
                            <Dropdown.Divider/>
                            <div style={dropdownStyle}>
                                {this.generateTimes().map((elem, idx) => {
                                    return <DropdownItem key={idx} value={elem} as={"button"}
                                                         onClick={this.handleChange}
                                                         className={"fromtime"}>{elem}</DropdownItem>;
                                })}
                            </div>
                        </DropdownButton>
                        <DropdownButton title={"Any End Time"}
                                        value={this.state.totime}
                                        size={"lg"}
                                        as={ButtonGroup} id={"totime"} style={timeStyle}>
                            <DropdownItem key={"-1"} value={"Any End Time"} as={"button"}
                                          onClick={this.handleAnySelection}
                                          className={"totime"}>Any End
                                Time</DropdownItem>
                            <Dropdown.Divider/>
                            <div style={dropdownStyle}>
                                {this.generateTimes().map((elem, idx) => {
                                    return <DropdownItem key={idx} value={elem} as={"button"}
                                                         onClick={this.handleChange}
                                                         className={"totime"}>{elem}</DropdownItem>;
                                })}
                            </div>
                        </DropdownButton>
                    </div>
                    <DropdownButton title={"Any Car Type"} size={"lg"} id={"vtname"} style={btnStyle}
                                    as={ButtonGroup}>
                        <DropdownItem key={"-1"} value={"Any Car Type"} as={"button"} onClick={this.handleAnySelection}
                                      className={"vtname"}> Any Car Type</DropdownItem>
                        <Dropdown.Divider/>
                        <div style={dropdownStyle}>
                            {this.state.vtnameSelection.map((elem, idx) => {
                                return <DropdownItem key={idx} value={elem} as={"button"} className={"vtname"}
                                                     onClick={this.handleChange}>{elem}</DropdownItem>;
                            })}
                        </div>
                    </DropdownButton>
                </div>
                <div>
                    <Button size={"lg"} onClick={() => this.props.handleSubmit(this.state)} style={{margin: "10px 0"}}>Search</Button>
                </div>
            </React.Fragment>
        )
    }
}


export default VehicleFilters;

