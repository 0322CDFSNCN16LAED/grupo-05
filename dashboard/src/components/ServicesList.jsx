import React from "react";
import { useState, useEffect } from "react"
import {Link} from "react-router-dom"


function ServiceList() {

    const [services, setServices] = useState([])

    async function fetchData() {
        const result = await fetch("http://localhost:3030/api/service");
        const jsonResult = await result.json();
        const data = await jsonResult.data;
        setServices(data.rows)
    }

    useEffect(() =>  {
        fetchData();
    },[])

    

    return (
        <>
        <h2> Servicios: </h2>

        <ul>
         {services.map((service, i) => {
            return(
                < div className="d-flex mb-4" >
                    <div className={`card border-left-success shadow py-2`}>
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">

                                    <div className="h5 mb-0 font-weight-bold text-gray-800">

                                        <li key={i}>
                                            <h3>ID: {service.id} </h3>
                                            <p> Precio: ${service.price} </p>
                                            <p> Descripcion del trabajo: {service.jobDescription} </p>
                                            <p> Categoria: {service.category.name} </p>
                                            <Link type="button" className="btn btn-success" to={`/service/${service.id}`}>
                                                Detalle del servicio
                                            </Link>
                                        </li>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <i
                                        className={` fa-2x text-gray-300`}
                                    ></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           )
        })

        }
        </ul>
            
        </>
    );
}

export default ServiceList;