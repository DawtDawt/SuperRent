import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom'
import Homepage from "./components/Homepage";
import Customer from "./components/customer/Customer";
import Clerk from "./components/clerk/Clerk";
import ReserveVehicle from "./components/customer/ReserveVehicle";
import ReserveSuccess from "./components/customer/ReserveSuccess";
import RentVehicle from "./components/clerk/RentVehicle";
import RentSuccess from "./components/clerk/RentSuccess";

function App() {
    return (
        <React.Fragment>
                <Switch>
                    <Route exact path={"/"} component={Homepage}/>
                    <Route exact path={"/customer"} component={Customer}/>
                    <Route exact path={"/clerk"} component = {Clerk}/>
                    <Route exact path={"/clerk/rent/:city/:location/:fromdate/:todate/:fromtime/:totime/:vtname/:vlicense"} component={RentVehicle}/>
                    <Route exact path={"/clerk/rent/success/:city/:location/:fromdate/:todate/:fromtime/:totime/:vtname/:vlicense/:rid/:dlicense"} component={RentSuccess}/>
                    <Route exact path={"/customer/reserve/:city/:location/:fromdate/:todate/:fromtime/:totime/:vtname"} component={ReserveVehicle}/>
                    <Route exact path={"/customer/reserve/success/:city/:location/:fromdate/:todate/:fromtime/:totime/:vtname/:confNo"} component={ReserveSuccess}/>
                </Switch>
        </React.Fragment>
    );
}

export default App;
