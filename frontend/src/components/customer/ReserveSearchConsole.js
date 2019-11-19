import React from 'react';
import {Button, ButtonGroup, DropdownButton, DropdownItem} from "react-bootstrap";
import {DateRangePicker} from 'react-dates';
import ReactDOM from "react-dom";
import ReserveTable from "./ReserveTable";


class ReserveSearchConsole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.ReserveTable = React.createRef();
    }

    handleSubmit = (state) => {
        if (state["reserve-location"] && state["reserve-startDate"] && state["reserve-endDate"] && state["reserve-fromtime"] && state["reserve-totime"]) {
            const body = {};
            body["city"] = state["reserve-location"].split(" - ")[0];
            body["location"] = state["reserve-location"].split(" - ")[1];
            body["fromdate"] = state["reserve-startDate"].format("YYYY-MM-DD");
            body["todate"] = state["reserve-endDate"].format("YYYY-MM-DD");
            body["fromtime"] = state["reserve-fromtime"];
            body["totime"] = state["reserve-totime"];

            const query = Object.keys(body).map(function (key) {
                return key + '=' + encodeURIComponent(body[key]);
            }).join('&');

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
                        const vehicleTypes = [];
                        data.data.forEach((car) => {
                            if (!vehicleTypes.includes(car.vtname)) {
                                vehicleTypes.push(car.vtname);
                            }
                        });
                        vehicleTypes.sort();
                        this.setState({vehicleTypes});
                        ReactDOM.render(<ReserveTable ref={this.ReserveTable}
                                                      vehicles={this.state.vehicles}
                                                      vehicleTypes={vehicleTypes}/>, document.getElementById("reserve-result"));
                        this.ReserveTable.current.fadeIn();
                    }
                })
                .catch(console.log);
        }

    };

    handleChange = (event) => {
        const btnName = event.target.className.split(" ")[0];
        document.getElementById(btnName).innerText = event.target.value;
        document.getElementById(btnName).className = document.getElementById(btnName).className.split(" ").filter((elem) => {
           return elem !== "btn-outline-primary";
        }).join(" ");
        document.getElementById(btnName).className = document.getElementById(btnName).className.concat(" btn-primary");
        this.setState({[btnName]: event.target.value});
        setTimeout(() => {
            if (this.state["reserve-location"]
                && this.state["reserve-startDate"]
                && this.state["reserve-endDate"]
                && this.state["reserve-fromtime"]
                && this.state["reserve-totime"]) {
                document.getElementById("searchBtn").disabled = false;
                document.getElementById("searchBtn").onclick = () => {
                    this.handleSubmit(this.state);
                };
            }
        }, 200);
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
                    <DropdownButton title={"Location"} size={"lg"} id={"reserve-location"} style={locationStyle}
                                    as={ButtonGroup}
                                    variant={"outline-primary"}
                                    drop={'down'}>
                        <div style={dropdownStyle}>
                            {this.props.branchSelection.map((elem, idx) => {
                                return <DropdownItem key={idx} value={elem} as={"button"}
                                                     className={"reserve-location"}
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
                        <DropdownButton title={"Start Time"}
                                        value={this.state["reserve-fromtime"]}
                                        size={"lg"}
                                        variant={"outline-primary"}
                                        as={ButtonGroup} id={"reserve-fromtime"} style={timeStyle}>
                            <div style={dropdownStyle}>
                                {this.props.times.map((elem, idx) => {
                                    return <DropdownItem key={idx} value={elem} as={"button"}
                                                         onClick={this.handleChange}
                                                         className={"reserve-fromtime"}>{elem}</DropdownItem>;
                                })}
                            </div>
                        </DropdownButton>
                        <DropdownButton title={"End Time"}
                                        value={this.state["reserve-totime"]}
                                        size={"lg"}
                                        variant={"outline-primary"}
                                        as={ButtonGroup} id={"reserve-totime"} style={timeStyle}>
                            <div style={dropdownStyle}>
                                {this.props.times.map((elem, idx) => {
                                    return <DropdownItem key={idx} value={elem} as={"button"}
                                                         onClick={this.handleChange}
                                                         className={"reserve-totime"}>{elem}</DropdownItem>;
                                })}
                            </div>
                        </DropdownButton>
                    </div>
                </div>
                <div>
                    <Button size={"lg"} id={"searchBtn"} onClick={() => this.handleSubmit(this.state)}
                            style={{margin: "10px 0"}} disabled>Search</Button>
                </div>
                <div id="reserve-result"></div>
            </React.Fragment>
        )
    }
}


export default ReserveSearchConsole;

