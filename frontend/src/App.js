import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Homepage from "./components/Homepage";
import Rent from "./components/clerk/Rent";
import Customer from "./components/customer/Customer";
import ReserveVehicle from "./components/customer/ReserveVehicle";
import ReserveSuccess from "./components/customer/ReserveSuccess";

function App() {
    return (
        <React.Fragment>
                <Switch>
                    <Route exact path={"/"} component={Homepage}/>
                    <Route exact path={"/customer"} component={Customer}/>
                    <Route exact path={"/customer/reserve/:city/:location/:fromdate/:todate/:fromtime/:totime/:vtname"} component={ReserveVehicle}/>
                    <Route exact path={"/customer/reserve/success/:city/:location/:fromdate/:todate/:fromtime/:totime/:vtname/:confNo"} component={ReserveSuccess}/>
                    <Route exact path={"/rent"} component={Rent}/>
                </Switch>
        </React.Fragment>
    );
}

export default App;
