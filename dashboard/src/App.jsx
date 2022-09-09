import React from "react";
import ServicesList from "./components/ServicesList";
import UsersList from "./components/UsersList";
import UserDetail from "./components/UserDetail";
import ServiceDetail from "./components/ServiceDetail";
import {BrowserRouter, Route, Switch} from "react-router-dom"


function App() {
    return (
        
        <BrowserRouter>
            <Switch>
                <Route path="/service" component={ServicesList} exact={true} />
                <Route path="/user" component={UsersList} exact={true} />
                <Route path="/service/:id" component={ServiceDetail} exact={true} />
                <Route path="/user/:id" component={UserDetail} />
            </Switch>
        </BrowserRouter>
        
    );
}

export default App;
