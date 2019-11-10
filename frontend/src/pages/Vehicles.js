import React from 'react';

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
                <table className={"table table-bordered table-responsive"}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>License Plate</th>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Year</th>
                        <th>Colour</th>
                        <th>Odometer</th>
                        <th>Status</th>
                        <th>Vehicle type</th>
                        <th>Location</th>
                        <th>City</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.vehicles.map(elem => (
                        <tr key={elem.id}>
                            <td>{elem.id}</td>
                            <td>{elem.title}</td>
                            <td>{elem.title}</td>
                            <td>{elem.title}</td>
                            <td>{elem.title}</td>
                            <td>{elem.title}</td>
                            <td>{elem.title}</td>
                            <td>{elem.title}</td>
                            <td>{elem.title}</td>
                            <td>{elem.title}</td>
                            <td>{elem.title}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}


export default Vehicles;
