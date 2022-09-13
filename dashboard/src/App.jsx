import React from "react";
import ServicesList from "./components/ServicesList";
import UsersList from "./components/UsersList";
import UserDetail from "./components/UserDetail";
import ServiceDetail from "./components/ServiceDetail";
import CategoriesList from "./components/CategoriesList";
import Cards from "./components/Cards"

import {BrowserRouter, Route, Switch, Link} from "react-router-dom"


function App() {
    return (
        
        <BrowserRouter>
            <Link to="/user" exact="true">Usuarios</Link>
            <br/>
            <Link to="/service" exact="true">Servicios</Link>
            <br/>
            <Link to="/category" exact="true">Categorias</Link>
            <Switch>
                <Route path="/service" component={ServicesList} exact={true} />
                <Route path="/user" component={UsersList} exact={true} />
                <Route path="/service/:id" component={ServiceDetail} exact={true} />
                <Route path="/user/:id" component={UserDetail} />
                <Route path="/category" component={CategoriesList} exact={true}/>
                
                <Route path="/" component={Cards} exact={true} />
            
            </Switch>

        </BrowserRouter>
        
    );
}

export default App;
