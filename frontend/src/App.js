import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import Homepage from "./components/Homepage";
import Rent from "./components/clerk/Rent";
import Customer from "./components/customer/Customer";
import Browse from "./components/customer/BrowseSearchConsole";

function App() {
    return (
        <React.Fragment>
            <Switch>
                <Route exact path={"/"} component={Homepage}/>
                <Route exact path={"/customer"} component={Customer}/>
                <Route exact path={"/rent"} component={Rent}/>
            </Switch>
        </React.Fragment>
    );
}

export default App;
