import React from 'react';
import {Button} from "react-bootstrap";
import ReturnTable from "./ReturnTable";
import ReactDOM from "react-dom";
import moment from "moment";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import {createReturn} from "../Fetch";


class ReturnSearchConsole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSubmit = async (event) => {
        const response = await createReturn(this.state.rid,moment().format("YYYY-MM-DD"),moment().format("LT"),this.state.odometer,this.state.fulltank,0);
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
                                             rid: response.data,
                                             date: moment().format("YYYY-MM-DD"),
                                             time: moment().format("LT"),
                                             odometer: this.state.odometer,
                                             fulltank: this.state.fulltank,
                                             value: 0
                                         }}/>, document.getElementById("return-result"));
        }, 500);
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        console.log(event.target.name);
        console.log(event.target.value);
    };

    handleCheck = (event) => {

        this.setState({
            isChecked: !this.state.isChecked,
        });
    };


    render() {
        const consoleStyle = {
            margin: "20px",
            textAlign: "center"
        };

        const returnStyle = {
            maxWidth: "300px",
            textAlign: "center",
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
                                    <Form.Control type="number" placeholder="Enter Rent ID" name = "rid"
                                                  onChange={this.handleChange}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="odometer">
                                <Form.Label column sm="4">
                                    Odometer
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="number" placeholder="Enter Odometer" name = "odometer"
                                                  onChange={this.handleChange}/>
                                </Col>
                            </Form.Group>
                            <Form.Group controlId="fulltank">
                                <Form.Check type="checkbox" label="Full Tank"  name ="fulltank" />
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

