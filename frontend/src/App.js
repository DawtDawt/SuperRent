import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Vehicles from "./pages/Vehicles";
import Navbar from "./Navbar";

function App() {
    return (
        <React.Fragment>
            <Navbar/>
            <Switch>
                <Route exact path={"/vehicles"} component={Vehicles}/>
                <Route exact path={"/"} component={Vehicles}/>
            </Switch>
        </React.Fragment>
    );
}

export default App;
