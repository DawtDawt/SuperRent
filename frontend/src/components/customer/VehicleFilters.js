import React from 'react';
import {Button, ButtonGroup, DropdownButton, DropdownItem} from "react-bootstrap";
import {DateRangePicker} from 'react-dates';
import Dropdown from "react-bootstrap/Dropdown";


class VehicleFilters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            branchSelection: [],
            vehicleTypeSelection: ['Economy', 'Compact', 'Mid-Size', 'Standard', 'Full-size', 'SUV', 'Truck'],
        };
    }

    componentDidMount() {
        document.getElementById("startDate").placeholder = "Any Date";
        document.getElementById("endDate").placeholder = "Any Date";
        fetch("http://localhost:8080/table/branch")
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data.data);
                this.setState({branchSelection: data.data});
            })
            .catch(console.log);

    }

    generateTimes = () => {
        const times = [];
        times.push("12:00 AM", "12:30 AM");
        for (let i = 1; i < 12; i++) {
            times.push(String(i) + ":00 AM");
            times.push(String(i) + ":30 AM");
        }
        times.push("12:00 PM", "12:30PM");
        for (let i = 1; i < 12; i++) {
            times.push(String(i) + ":00 PM");
            times.push(String(i) + ":30 PM");
        }
        return times;
    };

    handleChange = (event) => {
        const btnName = event.target.className.split(" ")[0];
        document.getElementById(btnName).innerText = event.target.value;
        document.getElementById(btnName).className = document.getElementById(btnName).className.concat(" btn-success");
        this.setState({[btnName]: event.target.value});
        console.log(event.target.value);
    };

    handleSubmit = (event) => {
        event.preventDefault();
    };

    render() {
        const btnStyle = {
            margin: "5px",
            width: "165px",
            height: "50px",
        };
        const timeStyle = {
            width: "180px",
            margin: "5px"
        };
        const dropdownStyle = {
            maxHeight: "205px",
            width: "180px",
            overflowY: "scroll",
        };
        const flexStyle = {
            minWidth: "85vw",
            display: "flex", flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center"
        };
        return (
            <React.Fragment>
                <div style={flexStyle}>
                    <div>
                    <DropdownButton title={"Any City"} size={"lg"} id={"city"} style={btnStyle}
                                    as={ButtonGroup} drop={'down'}>
                        <div style={dropdownStyle}>
                            <DropdownItem key={"-1"} value={"any"} as={"button"}> Any City
                            </DropdownItem>
                            <Dropdown.Divider/>
                            {this.state.branchSelection.map((elem, idx) => {
                                return <DropdownItem key={idx} value={elem.location} as={"button"}
                                                     className={"city"}
                                                     onClick={this.handleChange}
                                                     style={btnStyle}>{elem.location}</DropdownItem>;
                            })}
                        </div>
                    </DropdownButton>
                    <DropdownButton title={"Any Location"} size={"lg"} id={"location"} style={btnStyle}
                                    as={ButtonGroup} drop={'down'}>
                        <div style={dropdownStyle}>
                            <DropdownItem key={"-1"} value={"any"} as={"button"}> Any Location
                            </DropdownItem>
                            <Dropdown.Divider/>
                            {this.state.branchSelection.map((elem, idx) => {
                                return <DropdownItem key={idx} value={elem.location} as={"button"}
                                                     className={"location"}
                                                     onClick={this.handleChange}
                                                     style={btnStyle}>{elem.location}</DropdownItem>;
                            })}
                        </div>
                    </DropdownButton>
                    <DropdownButton title={"Any Car Type"} size={"lg"} id={"vehicleType"} style={btnStyle}
                                    as={ButtonGroup}>
                        <div style={dropdownStyle}>
                            <DropdownItem key={"-1"} value={"any"} as={"button"}> Any Car Type
                            </DropdownItem>
                            <Dropdown.Divider/>
                            {this.state.vehicleTypeSelection.map((elem, idx) => {
                                return <DropdownItem key={idx} value={elem} as={"button"} className={"vehicleType"}
                                                     onClick={this.handleChange}>{elem}</DropdownItem>;
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
                    <DropdownButton title={"Any Start Time"}
                                    value={this.state.fromTime}
                                    size={"lg"}
                                    as={ButtonGroup} id={"fromTime"} style={timeStyle}>
                        <div style={dropdownStyle}>
                            <DropdownItem key={"-1"} value={"any"} as={"button"}> Any Start Time</DropdownItem>
                            <Dropdown.Divider/>
                            {this.generateTimes().map((elem, idx) => {
                                return <DropdownItem key={idx} value={elem} as={"button"}
                                                     onClick={this.handleChange}
                                                     className={"fromTime"}>{elem}</DropdownItem>;
                            })}
                        </div>
                    </DropdownButton>
                    <DropdownButton title={"Any End Time"}
                                    value={this.state.toTime}
                                    size={"lg"}
                                    as={ButtonGroup} id={"toTime"} style={timeStyle}>
                        <div style={dropdownStyle}>
                            <DropdownItem key={"-1"} value={"any"} as={"button"}> Any End Time</DropdownItem>
                            <Dropdown.Divider/>
                            {this.generateTimes().map((elem, idx) => {
                                return <DropdownItem key={idx} value={elem} as={"button"}
                                                     onClick={this.handleChange}
                                                     className={"toTime"}>{elem}</DropdownItem>;
                            })}
                        </div>
                    </DropdownButton>
                    </div>
                </div>
                <div>
                    <Button size={"lg"} onClick={this.handleSubmit} style={{margin: "10px 0 0 0"}}>Search</Button>
                </div>
            </React.Fragment>
        )
    }
}


export default VehicleFilters;
