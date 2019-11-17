import React from 'react';
import CustomerNavbar from "./CustomerNavbar";

class Vehicles extends React.Component {
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
            <div>
                <CustomerNavbar/>
            </div>
        )
    }
}


export default Vehicles;