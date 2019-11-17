import React from 'react';
import styles from './ReserveForm.module.css'
import {Button, ButtonGroup, ButtonToolbar, Dropdown, DropdownButton, DropdownItem, Form} from "react-bootstrap";
import {DateRangePicker} from 'react-dates';
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";


class ReserveForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            branch: 'Location',
            vehicleType: 'Vehicle Type',
            fromDate: '',
            toDate: '',
            fromTime: '',
            toTime: '',
            branchSelection: [],
            vehicleTypeSelection: ['Economy', 'Compact', 'Mid-Size', 'Standard', 'Full-size', 'SUV', 'Truck'],
        };
    }

    componentDidMount() {
        // fetch(this.props.host + "/table/branch")
        //     .then(response => response.json())
        //     .then(data => {
        //         // this.setState({branch: data.data});
        //     })
        //     .catch(console.log);

        // temp branch data to replicate API call to /table/branch
        this.setState({branchSelection: ['Vancouver', 'Richmond', 'Burnaby']});
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
        console.log(this.state.startDate.format('YYYY-MM-DD'));
        // fetch("")
    };

    render() {
        const btnStyle = {
            width: "200px",
            // height: "50px",
        };
        const timeStyle = {
            width: "160px"
        };
        const dropdownStyle = {
            maxHeight: "200px",
            width: "160px",
            overflowY: "scroll"
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group style={{width: "100vw"}}>
                    <ButtonGroup size={'lg'}>
                        <DropdownButton title={"Location"} size={"lg"} id={"branch"} style={btnStyle}
                                        as={ButtonGroup}>
                            {this.state.branchSelection.map((elem, idx) => {
                                return <DropdownItem key={idx} value={elem} as={"button"} className={"branch"}
                                                     onClick={this.handleChange} style={btnStyle}>{elem}</DropdownItem>;
                            })}
                        </DropdownButton>
                        <DropdownButton title={"Vehicle Type"} size={"lg"} id={"vehicleType"} style={btnStyle}
                                        as={ButtonGroup}>
                            {this.state.vehicleTypeSelection.map((elem, idx) => {
                                return <DropdownItem key={idx} value={elem} as={"button"} className={"vehicleType"}
                                                     onClick={this.handleChange} style={btnStyle}>{elem}</DropdownItem>;
                            })}
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
                    </ButtonGroup>
                </Form.Group>
                <Button type="submit" size={"lg"} value="Submit">Submit</Button>
            </Form>
        )
    }
}


export default ReserveForm;
