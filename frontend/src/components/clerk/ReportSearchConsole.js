import React from 'react';
import {Button, ButtonGroup, DropdownButton, DropdownItem} from "react-bootstrap";
import {SingleDatePicker} from "react-dates";
import ReactDOM from "react-dom";
import ReportTable from "./ReportTable";
import Spinner from "react-bootstrap/Spinner";
import {getDailyRentals, getDailyRentalsByBranch, getDailyReturns, getDailyReturnsByBranch} from "../Fetch"
import moment from "moment";

class ReportSearchConsole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            optionSelection: ['Rental', 'Return'],
        };
    }

    handleSubmit = async (event) => {

        let reportCity = this.state.reportLocationCity && this.state.reportLocationCity.split(" - ")[0];
        let reportLocation = this.state.reportLocationCity && this.state.reportLocationCity.split(" - ")[1];
        let reportDate = this.state.reportDate && moment(this.state.reportDate).format("YYYY-MM-DD");
        let reportType = this.state.reportType;

        let report = {

        };
        if (reportCity && reportDate && reportType) {

            try {
                if (reportType === "Rental") {
                    if (reportCity === "All Locations") {
                        // Daily Rental
                        report = await getDailyRentals(reportDate);
                    } else {
                        // Daily Rental By Branch
                        report = await getDailyRentalsByBranch(reportDate, reportLocation, reportCity);
                    }
                } else {
                    if (reportCity === "All Locations") {
                        // Daily Return
                        report = await getDailyReturns(reportDate);
                    } else {
                        // Daily Return by Branch
                        report = await getDailyReturnsByBranch(reportDate, reportLocation, reportCity);
                    }
                }

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
                        report={report}/>, document.getElementById("report-result"));
                }, 500);

            } catch (e) {
                console.log(e);
            }
        }
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
                    <DropdownButton title={"Location"} size={"lg"} id={"reportLocationCity"} style={locationStyle}
                                    as={ButtonGroup}
                                    variant={"outline-primary"}
                                    drop={'down'}>
                        <div style={dropdownStyle}>
                            <DropdownItem key={"-1"} value={"All Locations"} as={"button"} className={"reportLocationCity"}
                                          onClick={this.handleChange}
                            > All Locations
                            </DropdownItem>
                            {this.props.branchSelection.map((elem, idx) => {
                                return <DropdownItem key={idx} value={elem} as={"button"}
                                                     className={"reportLocationCity"}
                                                     onClick={this.handleChange}>{elem}</DropdownItem>;
                            })}
                        </div>
                    </DropdownButton>
                    <SingleDatePicker
                        date={this.state.reportDate} // momentPropTypes.momentObj or null
                        onDateChange={reportDate => this.setState({reportDate})} // PropTypes.func.isRequired
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

