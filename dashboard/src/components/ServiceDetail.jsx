import React from "react";
import { useState, useEffect } from "react"
import {Link} from "react-router-dom"

function ServiceDetail(props) {
    const id = props.match.params.id;

    const [service, setService] = useState(null)

    async function fetchData() {
        const result = await fetch(`http://localhost:3030/api/service/${id}`);
        const jsonResult = await result.json();
        const data = await jsonResult.data;
        setService(data)
    }


    useEffect(() =>  {
        fetchData();
    },[])

    useEffect(() =>  {
        console.log(service)
    },[service])

    console.log("service: ", service)
    if(!service){
        return(<div>Cargando...</div>);
    }
    return(
        <>
            {
                service.servicePhoto.map((servicePhoto, i) => {
                    return <div key={i}><img src={`http://localhost:3030/images/avatars/${servicePhoto.photo}`} /></div>
                })
            }
            <h3>ID: {service.id} </h3>
            <p> Precio: ${service.price} </p>
            <p> Descripcion del trabajo: {service.jobDescription} </p>
            <p> Categoria: {service.category.name} </p>
        </>
    )
}

export default ServiceDetail;
// <img src={`http://localhost:3030/images/avatars/${service.servicePhoto[0]}`}/>