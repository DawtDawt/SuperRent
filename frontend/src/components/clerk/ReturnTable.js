import React from 'react';

class ReturnTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const containerStyle = {
            margin: "10px",
            textAlign: "center"
        };

        return (
            <div style={containerStyle}>
                <div>
                    <h3>Return Successful</h3>
                </div>
                <div className={"row"}>
                    <div className={"col-sm"} style={{textAlign: "right"}}>
                        <h5>Rent ID: </h5>
                        <h5>Return Date: </h5>
                        <h5>Return Time: </h5>
                        <h5>Full Tank: </h5>
                        <h5>Price: </h5>
                    </div>
                    <div className={"col-sm"} style={{textAlign: "left"}}>
                        <h5>{this.props.rentDetail.rid}</h5>
                        <h5>{this.props.rentDetail.date}</h5>
                        <h5>{this.props.rentDetail.time}</h5>
                        <h5>{this.props.rentDetail.fulltank? "Yes" : "No"}</h5>
                        <h5>{this.props.rentDetail.value}</h5>
                    </div>
                </div>
            </div>
        )
    }
}


export default ReturnTable;
