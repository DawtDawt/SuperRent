import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Homepage from "./components/Homepage";
import Rent from "./components/clerk/Rent";
import Customer from "./components/customer/Customer";
import ReserveVehicle from "./components/customer/ReserveVehicle";

function App() {
    return (
        <React.Fragment>
                <Switch>
                    <Route exact path={"/"} component={Homepage}/>
                    <Route exact path={"/customer"} component={Customer}/>
                    <Route path={"/customer/reserve/:city/:location/:fromdate/:todate/:fromtime/:totime/:vtname"} component={ReserveVehicle}/>
                    <Route exact path={"/rent"} component={Rent}/>
                </Switch>
        </React.Fragment>
    );
}

export default App;
