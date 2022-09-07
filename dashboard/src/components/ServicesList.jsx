import React from "react";
import { useState, useEffect } from "react"



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
                <li key={i}>
                   <h3>ID: {service.id} </h3>
                   <p> Precio: ${service.price} </p>
                   <p> Descripcion del trabajo: {service.jobDescription} </p>
                   <p> Categoria: {service.category.name} </p>
                </li>
           )
        })
        }
        </ul>

        </>
    );
}

export default ServiceList;