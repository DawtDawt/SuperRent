import React from 'react';
import {Button, ButtonGroup, DropdownButton, DropdownItem} from "react-bootstrap";
import {SingleDatePicker} from "react-dates";
import ReactDOM from "react-dom";
import ReportTable from "./ReportTable";

class ReportSearchConsole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            optionSelection: ['Rental', 'Return'],
        };
        this.ReportTable = React.createRef();
    }

    handleSubmit = async (event) => {
        let reportLocation = this.state.reportLocation;
        let reportType = this.state.reportType;
        let date = this.state.date;

        if (reportLocation && reportType && date) {
            let query;
            date = date.format("YYYY-MM-DD");
            reportType = reportType.toLowerCase();
            if ((reportLocation) === "All Location") {
                query = `http://localhost:8080/report/${reportType}?${this.encodeQuery({date})}`;
            } else {
                const location = reportLocation.split(" - ")[0];
                const city = reportLocation.split(" - ")[1];
                console.log(location);
                console.log(city);
                query = `http://localhost:8080/report/${reportType}/branch?${this.encodeQuery({location, city, date})}`;
            }
            console.log(query);

            const response = await fetch(query);
            const content = await response.json();
            console.log(content);

            // ReactDOM.render(<ReportTable ref={this.ReportTable}
            //                              report={content.data}
            //                              action={reportType}/>, document.getElementById("report-result"));
            this.ReportTable.current.fadeIn();
        }

        // temp data to testing convenience
        ReactDOM.render(<ReportTable ref={this.ReportTable}
                                     action={"Return"}
                                         report={{
                                             "vehicle": [
                                                 {
                                                     "vtname": "SUV",
                                                     "location": "UBC",
                                                     "city": "Vancouver"
                                                 }
                                             ],
                                             "perCategory": [
                                                 {
                                                     "vtname": "SUV",
                                                     "count": "1"
                                                 }
                                             ],
                                             "revenuePerCategory": [
                                                 {
                                                     "vtname": "SUV",
                                                     "sum": "2000"
                                                 }
                                             ],
                                             "perBranch": [
                                                 {
                                                     "location": "UBC",
                                                     "city": "Vancouver",
                                                     "count": "1"
                                                 }
                                             ],
                                             "revenuePerBranch": [
                                                 {
                                                     "location": "UBC",
                                                     "city": "Vancouver",
                                                     "sum": "2000"
                                                 }
                                             ],
                                             "perCompany": 1
                                         }}/>, document.getElementById("report-result"));


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
            padding: "20px",
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
                </div>
                <div id={"report-result"}></div>
            </React.Fragment>
        )
    }
}


export default ReportSearchConsole;

