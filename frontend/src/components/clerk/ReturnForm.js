import React from "react";
import {Button, ButtonGroup, DropdownButton, DropdownItem, Form} from "react-bootstrap";
import styles from "./RentForm.module.css"

class ReturnForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            RentSelection: [],
        };
    }

    componentDidMount() {
        fetch("http://localhost:8080/table/rental")
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data.data);
                this.setState({RentSelection: data.data});
            })
            .catch(console.log);

    }


    isFormFilled = () => {
        return this.state.hasOwnProperty("customer");
    };


    handleSubmit = (event) => {
        event.preventDefault();
        // Check if all forms have been filed
        if (this.isFormFilled()) {
            console.log('form')
        } else {

        }
    };


    handleChange = (event) => {
        const btnName = event.target.className.split(" ")[0];
        document.getElementById(btnName).innerText = event.target.value;
        document.getElementById(btnName).className = document.getElementById(btnName).className.concat(" btn-success");
        this.setState({[btnName]: event.target.value});
        console.log(event.target.value);
    };

render (){

    const btnStyle = {
        width: "300px",
        // height: "50px",
        margin: "000px",
    };

    const dropdownStyle = {
        maxHeight: "200px",
        width: "160px",
        overflowY: "scroll"
    };

    return (
        <React.Fragment>
            <Form.Group>
                <ButtonGroup size={'lg'}>

                    <DropdownButton title={"Rent ID"} size={"lg"} id={"rid"} style={btnStyle}
                                    as={ButtonGroup}>
                        {this.state.RentSelection.map((elem, idx) => {
                            return <DropdownItem key={idx} value={elem.location} as={"button"} className={"branch"}
                                                 onClick={this.handleChange}
                                                 style={btnStyle}>{elem.location}</DropdownItem>;
                        })}
                    </DropdownButton>
                    <Button size={"lg"} onClick={this.handleSubmit} style={{margin: "0px"}}>Return Customer Vehicles</Button>
                </ButtonGroup>
            </Form.Group>
        </React.Fragment>
    )
}
}


export default ReturnForm;