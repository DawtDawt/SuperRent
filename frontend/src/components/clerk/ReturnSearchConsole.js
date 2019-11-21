import React from 'react';
import {Button} from "react-bootstrap";
import ReturnTable from "./ReturnTable";
import ReactDOM from "react-dom";
import moment from "moment";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

class ReturnSearchConsole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.ResultTable = React.createRef();
    }

    handleSubmit = async (event) => {
        // if (this.state.rentID) {
        //     try {
        //         const body = {
        //             rid: this.state.rentID,
        //             date: moment().format("YYYY-MM-DD"),
        //             time: moment().format("LT"),
        //             odometer: 1300,
        //             fulltank: true,
        //             value: this.calculateCost()
        //         };
        //         const response = await fetch("http://localhost:8080/return/create", {
        //             method: "POST",
        //             headers: {
        //                 'Accept': 'application/json',
        //                 'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify(body)
        //         });
        //
        //         const content = await response.json();
        //
        //         if (content.error) {
        //             alert(content.error);
        //             console.log(content.error);
        //             throw Error(content.error);
        //         }
        //
        //         ReactDOM.render(<ReturnTable ref={this.ReportTable}
        //                                      rentDetail={body}/>, document.getElementById("return-result"));
        //     } catch (e) {
        //         console.log(e);
        //     }
        // }
        // temp rendering for testing
        ReactDOM.render(
            <div style={{margin: "30px"}}>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>,
            document.getElementById("return-result"));

        setTimeout(() => {
            ReactDOM.render(<ReturnTable ref={this.ReportTable}
                                         rentDetail={{
                                             rid: this.state.rentID,
                                             date: moment().format("YYYY-MM-DD"),
                                             time: moment().format("LT"),
                                             odometer: 1300,
                                             fulltank: true,
                                             value: this.calculateCost()
                                         }}/>, document.getElementById("return-result"));
        }, 500);
    };

    // TODO or should this be done in backend?
    // Calculates the cost of the rental based on rid
    calculateCost() {
        return 0;
    }

    handleChange = (event) => {
        this.setState({rentID: event.target.value});
        console.log(event.target.value);
    };

    render() {
        const consoleStyle = {
            margin: "20px",
            textAlign: "center"
        };

        const returnStyle = {
            maxWidth: "300px",
            textAlign: "right",
            margin: "auto",
            padding: "0"
        };

        return (
            <React.Fragment>
                <div style={consoleStyle}>
                    <div style={returnStyle}>
                        <Form>
                            <Form.Group as={Row} controlId="rentID">
                                <Form.Label column sm="4">
                                    Rent ID
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="number" placeholder="Enter Rent ID"
                                                  onChange={this.handleChange}/>
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                    <Button size={"lg"} onClick={this.handleSubmit}>Return Vehicle</Button>
                    <div id={"return-result"}></div>
                </div>
            </React.Fragment>
        )
    }
}


export default ReturnSearchConsole;

