import React from 'react';
import {Button, ButtonGroup, DropdownButton, DropdownItem} from "react-bootstrap";
import {SingleDatePicker} from "react-dates";
import ReactDOM from "react-dom";
import ReportTable from "./ReportTable";
import Spinner from "react-bootstrap/Spinner";

class ReportSearchConsole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            optionSelection: ['Rental', 'Return'],
        };
    }

    handleSubmit = async (event) => {

        // temp rendering for testing
        ReactDOM.render(
            <div style={{margin: "30px"}}>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
            , document.getElementById("report-result"));

        setTimeout(() => {
            // temp data to testing convenience
            ReactDOM.render(<ReportTable
                action={"rental"}
                location={"all"}
                report={{
                    "vehicle": [
                        {
                            "vtname": "Economy",
                            "location": "Richmond Centre",
                            "city": "Richmond"
                        },
                        {
                            "vtname": "Standard",
                            "location": "Dunbar",
                            "city": "Vancouver"
                        },
                        {
                            "vtname": "Compact",
                            "location": "Kerrisdale",
                            "city": "Vancouver"
                        },
                        {
                            "vtname": "SUV",
                            "location": "Kitsilano",
                            "city": "Vancouver"
                        },
                        {
                            "vtname": "SUV",
                            "location": "UBC",
                            "city": "Vancouver"
                        }
                    ],
                    "perCategory": [
                        {
                            "vtname": "Compact",
                            "count": "1"
                        },
                        {
                            "vtname": "Economy",
                            "count": "1"
                        },
                        {
                            "vtname": "SUV",
                            "count": "6"
                        },
                        {
                            "vtname": "Standard",
                            "count": "1"
                        }
                    ],
                    "perBranch": [
                        {
                            "location": "Richmond Centre",
                            "city": "Richmond",
                            "count": "1"
                        },
                        {
                            "location": "Dunbar",
                            "city": "Vancouver",
                            "count": "1"
                        },
                        {
                            "location": "Kerrisdale",
                            "city": "Vancouver",
                            "count": "1"
                        },
                        {
                            "location": "Kitsilano",
                            "city": "Vancouver",
                            "count": "1"
                        },
                        {
                            "location": "UBC",
                            "city": "Vancouver",
                            "count": "5"
                        }
                    ],
                    "perCompany": 5
                }}/>, document.getElementById("report-result"));
        }, 500);
    };

    encodeQuery(query) {
        return Object.keys(query).map(function (key) {
            return key + '=' + encodeURIComponent(query[key]);
        }).join('&');
    }


    handleChange = (event) => {
        const btnName = event.target.className.split(" ")[0];
        document.getElementById(btnName).innerText = event.target.value;
        document.getElementById(btnName).className = document.getElementById(btnName).className.concat(" btn-success");
        document.getElementById(btnName).className = document.getElementById(btnName).className.split(" ").filter((elem) => {
            return elem !== "btn-outline-primary";
        }).join(" ");
        this.setState({[btnName]: event.target.value});
        console.log(event.target.value);
    };

    render() {
        const locationStyle = {
            margin: "5px",
            width: "350px",
        };

        const reportTypeStyle = {
            margin: "5px",
            width: "180px",
        };

        const reportTypeDropdownStyle = {
            width: "180px",
        };

        const dropdownStyle = {
            maxHeight: "200px",
            width: "350px",
            overflowY: "scroll"
        };

        const consoleStyle = {
            margin: "20px",
            textAlign: "center"
        };

        return (
            <React.Fragment>
                <div style={consoleStyle}>
                    <DropdownButton title={"Location"} size={"lg"} id={"reportLocation"} style={locationStyle}
                                    as={ButtonGroup}
                                    variant={"outline-primary"}
                                    drop={'down'}>
                        <div style={dropdownStyle}>
                            <DropdownItem key={"-1"} value={"All Location"} as={"button"} className={"reportLocation"}
                                          onClick={this.handleChange}
                            > All Locations
                            </DropdownItem>
                            {this.props.branchSelection.map((elem, idx) => {
                                return <DropdownItem key={idx} value={elem} as={"button"}
                                                     className={"reportLocation"}
                                                     onClick={this.handleChange}>{elem}</DropdownItem>;
                            })}
                        </div>
                    </DropdownButton>
                    <SingleDatePicker
                        date={this.state.date} // momentPropTypes.momentObj or null
                        onDateChange={date => this.setState({date})} // PropTypes.func.isRequired
                        focused={this.state.focused} // PropTypes.bool
                        onFocusChange={({focused}) => this.setState({focused})} // PropTypes.func.isRequired
                        id="reportDate" // PropTypes.string.isRequired,
                        isOutsideRange={() => false}
                    />
                    <DropdownButton title={"Report Type"}
                                    size={"lg"}
                                    variant={"outline-primary"}
                                    as={ButtonGroup} id={"reportType"}
                                    style={reportTypeStyle}>
                        <div>
                            {this.state.optionSelection.map((elem, idx) => {
                                return <DropdownItem key={idx} value={elem} as={"button"}
                                                     onClick={this.handleChange}
                                                     className={"reportType"}
                                                     style={reportTypeDropdownStyle}>{elem}</DropdownItem>;
                            })}
                        </div>
                    </DropdownButton>
                    <Button size={"lg"} onClick={this.handleSubmit}>Generate Report</Button>
                    <div id={"report-result"}></div>
                </div>
            </React.Fragment>
        )
    }
}


export default ReportSearchConsole;

