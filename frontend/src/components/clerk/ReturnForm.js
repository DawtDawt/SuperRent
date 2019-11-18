import React from "react";
import {Button, ButtonGroup, DropdownButton, DropdownItem, Form} from "react-bootstrap";
import styles from "./RentForm.module.css"

class ReturnForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            CustomerSelection: [],
        };
    }


render (){
    return (
        <Button size={"lg"} onClick={this.handleSubmit} style={{margin: "0px"}}>Generate Receipt</Button>
    )
}




}


export default ReturnForm;