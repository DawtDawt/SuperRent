import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Vehicles from "./pages/Vehicles";
import Generate from "./pages/Generate";
import Browse from "./pages/Browse";
import Navbar from "./Navbar";
import Rent from "./pages/Rent";
import Return from "./pages/Return";

function App() {
    return (
        <React.Fragment>
            <Navbar/>
            <Switch>
                <Route exact path={"/vehicles"} component={Vehicles}/>
                <Route exact path={"/Generate Report"} component={Generate}/>
                <Route exact path={"/Browse"} component={Browse}/>
                <Route exact path={"/Rent"} component={Rent}/>
                <Route exact path={"/Return"} component={Return}/>
            </Switch>
        </React.Fragment>
    );
}

export default App;
