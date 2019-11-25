import ReactDOM from "react-dom";
import Spinner from "react-bootstrap/Spinner";
import React from "react";

export function renderOnDiv(id, elem) {
    ReactDOM.render(
        <div style={{textAlign: "center"}}>
            <div style={{margin: "20px"}}>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        </div>
        , document.getElementById(id));

    setTimeout(() => {
        ReactDOM.render(elem, document.getElementById(id));
    }, 200);
}

export function validateExpDate(expdate) {
    if (!expdate.includes("/") ||
        expdate.split("/").length !== 2 ||
        expdate.split("/")[0].length !== 2 ||
        expdate.split("/")[1].length !== 2) {

        alert("Invalid expiry date format");
        throw Error("Invalid expiry date format")

    }
}