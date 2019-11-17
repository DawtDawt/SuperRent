import React from 'react';
import styles from './ReserveForm.module.css'

class ReserveForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            branch: '',
            vehicleType: '',
            fromDate: '',
            toDate: '',
            fromTime: '',
            toTime: '',
            branchSelection: [],
            vehicleTypeSelection: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // fetch(this.props.host + "/table/branch")
        //     .then(response => response.json())
        //     .then(data => {
        //         // this.setState({branch: data.data});
        //     })
        //     .catch(console.log);

        // temp branch data to replicate API call to /table/branch
        this.setState({branchSelection: ['Vancouver', 'Richmond', 'Burnaby']});
        this.setState({vehicleTypeSelection: ['Economy', 'Compact', 'Mid-Size','Standard', 'Full-size', 'SUV', 'Truck']});
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        console.log(this.state);
        return (
            <form onSubmit={this.handleSubmit}>
                <div className={"form-group"}>
                    <select name={"branch"} value={this.state.branch} onChange={this.handleChange} id={"branch"}>
                        {this.state.branchSelection.map((elem, idx) => {
                            return <option key={idx} value={elem}>{elem}</option>;
                        })}
                    </select>
                </div>
                <div className={"form-group"}>
                    <select name={"vehicleType"} value={this.state.vehicleType} onChange={this.handleChange}
                            id={"vehicleType"}>
                        {this.state.vehicleTypeSelection.map((elem, idx) => {
                            return <option key={idx} value={elem}>{elem}</option>;
                        })}
                    </select>
                </div>
                <button type="submit" className={`btn btn-primary`} value="Submit">Submit</button>
            </form>
        )
    }
}


export default ReserveForm;
