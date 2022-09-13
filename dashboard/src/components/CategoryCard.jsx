import React from "react";
import { useState, useEffect } from "react"
import {Link} from "react-router-dom"

function CategoryCard() {

    const [categoriesCount, setCategoriesCount] = useState([])

    async function fetchData() {
        const result = await fetch("http://localhost:3030/api/category");
        const jsonResult = await result.json();
        const data = await jsonResult.data;
        setCategoriesCount(data.count)
    }

    useEffect(() =>  {
        fetchData();
    },[])

    return(
        <>
        <h2> Cantidad de categorias:{categoriesCount} </h2>

        </>
    )
}

export default CategoryCard;
