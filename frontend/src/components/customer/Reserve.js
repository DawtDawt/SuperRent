import React from 'react';
import CustomerNavbar from "./CustomerNavbar";
import ReserveForm from "./ReserveForm";

class Reserve extends React.Component {
    constructor(props) {
        super(props);
        this.state = {vehicles: []};
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(data => {
                this.setState({vehicles: data});
            })
            .catch(console.log);
    }

    render() {
        return (
            <React.Fragment>
                <CustomerNavbar/>
                <div className={"wrapper"}>
                    <ReserveForm/>
                </div>
            </React.Fragment>
        )
    }
}


export default Reserve;
