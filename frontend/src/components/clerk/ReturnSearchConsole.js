import React from 'react';
import {Button} from "react-bootstrap";
import ReturnTable from "./ReturnTable";
import moment from "moment";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {createReturn} from "../Fetch";
import {renderOnDiv} from "../Util";


class ReturnSearchConsole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: true,
        };
    }

    handleSubmit = async (event) => {
        let response;
        try {
            response = await createReturn(this.state.rid, moment().format("YYYY-MM-DD"), moment().format("LT"), this.state.odometer, this.state.isChecked, 150);
            renderOnDiv("return-result", <ReturnTable ref={this.ReportTable}
                                                      rentDetail={{
                                                          rid: response,
                                                          date: moment().format("YYYY-MM-DD"),
                                                          time: moment().format("LT"),
                                                          odometer: this.state.odometer,
                                                          fulltank: this.state.isChecked,
                                                          value: 150
                                                      }}/>);
        } catch (error) {
            console.log(error);
        }
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        console.log(event.target.name);
        console.log(event.target.value);
    };


    toggleChange = () => {
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
                                    <Form.Control type="number" placeholder="Enter Rent ID" name="rid"
                                                  onChange={this.handleChange}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="odometer">
                                <Form.Label column sm="4">
                                    Odometer
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="number" placeholder="Enter Odometer" name="odometer"
                                                  onChange={this.handleChange}/>
                                </Col>
                            </Form.Group>
                            <Form.Group controlId="fulltank">
                                <Form.Check type="checkbox" label="Full Tank" name="fulltank"
                                            checked={this.state.isChecked} onChange={this.toggleChange}/>
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

