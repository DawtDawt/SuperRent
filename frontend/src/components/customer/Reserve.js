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

    handleSubmit = (state) => {
        if (state.location && state.startDate && state.endDate && state.fromtime && state.totime && state.vtname) {
            const query = this.getQuery(state);
            console.log(query);
        }
    };

    getQuery = (state) => {
        const body = {
            city: state.location.split(" - ")[0],
            location: state.location.split(" - ")[1],
            fromdate: state.startDate.format("YYYY-MM-DD"),
            todate: state.endDate.format("YYYY-MM-DD"),
            fromtime: state.fromtime,
            totime: state.totime,
            vtname: state.vtname
        };

        const query = Object.keys(body).map(function (key) {
            return key + '=' + encodeURIComponent(body[key]);
        }).join('&');
        return query;
    };

    render() {
        const style = {
            padding: "60px 0px",
            border: "1px solid transparent",
            borderRadius: "35px",
            background: "#FFFFFF",
            boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
            transition: "all 0.3s cubic-bezier(.25,.8,.25,1)"
        };

        return (
            <React.Fragment>
                <CustomerNavbar activeLink={"reserve"}/>
                <div className={"wrapper"} style={style}>
                    <ReserveForm handleSubmit={this.handleSubmit}/>
                </div>
            </React.Fragment>
        )
    }
}


export default Reserve;
