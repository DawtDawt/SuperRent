import React from 'react';
import './Generate.css';

class Generate extends React.Component {
    render() {
        return (

            <div>
                <div class ="buttons">
                    <button>
                        Generate Report
                    </button>
                </div>

                <div class = "radialndrop">
                    <input type="radio" /> Rental
                    &nbsp;
                    <input type="radio"/> Returns
                    &nbsp;
                    <select id = "myList">
                        <option value = "All Branches">All Branches</option>
                        <option value = "UBC">UBC</option>
                        <option value = "SFU">SFU</option>
                    </select>
                </div>
            </div>
        )
    };



}

export default Generate;