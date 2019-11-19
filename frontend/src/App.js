import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Vehicles from "./components/customer/Vehicles";
import Homepage from "./components/Homepage";
import Rent from "./components/clerk/Rent";
import Reserve from "./components/customer/Reserve";
import Return from "./components/clerk/Return";

function App() {
    return (
        <React.Fragment>
            <Switch>
                <Route exact path={"/"} component={Homepage}/>
                <Route exact path={"/reserve"} component={Reserve}/>
                <Route exact path={"/vehicles"} component={Vehicles}/>
                <Route exact path={"/rent"} component={Rent}/>
                <Route exact path={"/return"} component={Return}/>
            </Switch>
        </React.Fragment>
    );
}

export default App;
