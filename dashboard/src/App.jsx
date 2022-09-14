import React from "react";
import "./App.css";
import ServicesList from "./components/ServicesList";
import UsersList from "./components/UsersList";
import UserDetail from "./components/UserDetail";
import ServiceDetail from "./components/ServiceDetail";
import CategoriesList from "./components/CategoriesList";
import Cards from "./components/Cards"

import {BrowserRouter, Route, Switch, Link} from "react-router-dom"


function App() {
    return (
    <BrowserRouter >
    <div className=" d-flex col-md-12">
         <ul
                className=" navbar-nav bg-gradient-danger sidebar sidebar-dark accordion col-md-4"
                id="accordionSidebar"
            >

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider my-0" />

                {/* <!-- Nav Item - Dashboard --> */}
                <li className="nav-item active">
                    <a className="nav-link" href="/">
                        
                        <span>Dashboard - EASY FIX</span>
                    </a>
                </li>

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider" />

                {/* <!-- Heading --> */}
                <div className="sidebar-heading">Actions</div>

                {/* <!-- Nav Item - Pages --> */}
                <li className="nav-item">
                    <Link className="nav-link collapsed" to="/" exact="true">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>HOME</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link collapsed" to="/user" exact="true">
                        <i className="fas fa-fw fa-user"></i>
                        <span>USUARIOS</span>
                    </Link>
                </li>

                {/* <!-- Nav Item - Charts --> */}
                <li className="nav-item">
                    <a className="nav-link" href="/service">
                        <i className="fas fa-fw fa-table"></i>
                        <span>SERVICIOS</span>
                    </a>
                </li>

                {/* <!-- Nav Item - Tables --> */}
                <li className="nav-item">
                    <a className="nav-link" href="/category">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>CATEGORIAS</span>
                    </a>
                </li>

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider d-none d-md-block" />
            </ul>
                <div id="wrapper " className="col-md-8">
            {/* <!-- Sidebar --> */}

            {/* <!-- End of Sidebar --> */}

            {/* <!-- Content Wrapper --> */}
            <div id="content-wrapper" className="d-flex flex-column">
                {/* <!-- Main Content --> */}
                <div id="content">
                    {/* <!-- Content Row Top --> */}
                    <div className="container-fluid pt-5">
                        
                            <Switch>
                                <Route path="/service" component={ServicesList} exact={true} />
                                <Route path="/user" component={UsersList} exact={true} />
                                <Route path="/service/:id" component={ServiceDetail} exact={true} />
                                <Route path="/user/:id" component={UserDetail} />
                                <Route path="/category" component={CategoriesList} exact={true} />

                                <Route path="/" component={Cards} exact={true} />

                            </Switch>

                        
                    </div>
                    {/* <!--End Content Row Top--> */}
                </div>
             
            </div>
            {/* <!-- End of Content Wrapper --> */}
        </div>
    </div>
           
</BrowserRouter>
        
        
    );
}

export default App;
