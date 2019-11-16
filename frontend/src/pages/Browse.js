import Generate from "./Generate";
import React from 'react';
import DatePicker from "react-datepicker";

class Browse extends React.Component {
    state = {
        startDate: new Date()
    };

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };


    render (){
        return (
            <div>
                <div>
                    <select id = "Vehicle Type">
                        <option value = "All Vehicle Type">All Vehicle Type</option>
                        <option value = "Economy">Economy</option>
                        <option value = "Compact">Compact</option>
                        <option value = "Mid-size">Mid-size</option>
                        <option value = "Standard">Standard</option>
                        <option value = "Full-size">Full-size</option>
                        <option value = "SUV">SUV</option>
                        <option value = "Truck">Truck</option>

                    </select>

                    &nbsp;
                    <select id = "Fuel Type">
                        <option value = "All Fuel Type">All Fuel Type</option>
                        <option value = "Gasoline">Gasoline</option>
                        <option value = "Hybrid">Hybrid</option>
                        <option value = "Regular">Regular</option>
                    </select>

                    &nbsp;
                    <select id = "Locations">
                        <option value = "All Branches">All Branch Locations</option>
                        <option value = "UBC">UBC</option>
                        <option value = "SFU">SFU</option>
                    </select>
                    &nbsp;
                    <select id = "Start Date">
                        <option value = "All Branches">Any Start Date</option>
                    </select>
                    &nbsp;
                    <select id = "End Date">
                        <option value = "All Branches">Any End Date</option>

                    </select>
                    &nbsp;



                    <button>
                        Search
                    </button>
                </div>
            </div>
        )



    };
}
export default Browse;