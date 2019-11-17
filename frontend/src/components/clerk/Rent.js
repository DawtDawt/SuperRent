import React from 'react';
import ClerkNavbar from "./ClerkNavbar";

class Rent extends React.Component {
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
                <ClerkNavbar/>
            </div>
        )
    }
}


export default Rent;
