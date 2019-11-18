import React from 'react';
import styles from './ReserveForm.module.css'
import {Button, ButtonGroup, DropdownButton, DropdownItem, Form} from "react-bootstrap";
import {DateRangePicker} from 'react-dates';


class ReserveForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            branchSelection: [],
            vehicleTypeSelection: ['Economy', 'Compact', 'Mid-Size', 'Standard', 'Full-size', 'SUV', 'Truck'],
        };
    }

    componentDidMount() {
        fetch("http://localhost:8080/table/branch")
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data.data);
                this.setState({branchSelection: data.data});
            })
            .catch(console.log);

        // temp branch data to replicate API call to /table/branch
        // this.setState({branchSelection: ['Vancouver', 'Richmond', 'Burnaby']});
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

    isFormFilled = () => {
        return this.state.hasOwnProperty("branch") &&
            this.state.hasOwnProperty("vehicleType") &&
            this.state.startDate &&
            this.state.endDate &&
            this.state.hasOwnProperty("fromTime") &&
            this.state.hasOwnProperty("toTime");
    };


    handleSubmit = (event) => {
        event.preventDefault();
        // Check if all forms have been filed
        if (this.isFormFilled()) {
            console.log('form')
        } else {

        }
    };

    render() {
        const btnStyle = {
            width: "180px",
            margin: "10px",
        };
        const timeStyle = {
            width: "200px",
            margin: "10px"
        };
        const dropdownStyle = {
            maxHeight: "200px",
            width: "160px",
            overflowY: "scroll"
        };
        return (
            <React.Fragment>
                <div>
                    <DropdownButton title={"Location"} size={"lg"} id={"branch"} style={btnStyle}
                                    as={ButtonGroup}>
                        {this.state.branchSelection.map((elem, idx) => {
                            return <DropdownItem key={idx} value={elem.location} as={"button"} className={"branch"}
                                                 onClick={this.handleChange}
                                                 style={btnStyle}>{elem.location}</DropdownItem>;
                        })}
                    </DropdownButton>
                    <DropdownButton title={"Car Type"} size={"lg"} id={"vehicleType"} style={btnStyle}
                                    as={ButtonGroup}>
                        {this.state.vehicleTypeSelection.map((elem, idx) => {
                            return <DropdownItem key={idx} value={elem} as={"button"} className={"vehicleType"}
                                                 onClick={this.handleChange}
                                                 style={btnStyle}>{elem}</DropdownItem>;
                        })}
                    </DropdownButton>
                </div>
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
                    <DropdownButton title={"Start Time"}
                                    value={this.state.fromTime}
                                    size={"lg"}
                                    as={ButtonGroup} id={"fromTime"} style={timeStyle}>
                        <div style={dropdownStyle}>
                            {this.generateTimes().map((elem, idx) => {
                                return <DropdownItem key={idx} value={elem} as={"button"}
                                                     onClick={this.handleChange}
                                                     className={"fromTime"}>{elem}</DropdownItem>;
                            })}
                        </div>
                    </DropdownButton>
                    <DropdownButton title={"End Time"}
                                    value={this.state.toTime}
                                    size={"lg"}
                                    as={ButtonGroup} id={"toTime"} style={timeStyle}>
                        <div style={dropdownStyle}>
                            {this.generateTimes().map((elem, idx) => {
                                return <DropdownItem key={idx} value={elem} as={"button"}
                                                     onClick={this.handleChange}
                                                     className={"toTime"}>{elem}</DropdownItem>;
                            })}
                        </div>
                    </DropdownButton>
                </div>

                <div>
                    <Button size={"lg"} onClick={this.handleSubmit} style={{margin: "10px 0 0 0"}}>Search</Button>
                </div>
            </React.Fragment>
        )
    }
}


export default ReserveForm;
