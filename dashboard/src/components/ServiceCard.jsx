import React from "react";
import { useState, useEffect } from "react"

function ServiceCard() {

    const [servicesCount, setServicesCount] = useState([])

    async function fetchData() {
        const result = await fetch("http://localhost:3030/api/service");
        const jsonResult = await result.json();
        const data = await jsonResult.data;
        setServicesCount(data.count)
    }

    useEffect(() =>  {
        fetchData();
    },[])

    return(
        <>
        <h2> Cantidad de servicios:{servicesCount} </h2>

        </>
    )
}

export default ServiceCard;
