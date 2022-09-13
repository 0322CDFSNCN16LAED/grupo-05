import React from "react";
import { useState, useEffect } from "react"
import {Link} from "react-router-dom"

function CategoriesList() {

    const [categories, setCategories] = useState([])

    async function fetchData() {
        const result = await fetch("http://localhost:3030/api/category");
        const jsonResult = await result.json();
        const data = await jsonResult.data;
        setCategories(data.rows)
    }

    useEffect(() =>  {
        fetchData();
    },[])

    return(
        <>
        <h2> Categorias: </h2>

        <ul>
         {categories.map((category, i) => {
            return(
                <li key={i}>
                   <h3> Categoria: {category.name} </h3>
                   <p> Cantidad de servicios registrados: {category.service.length} </p>
                </li>
           )
        })
        }
        </ul>

        </>
    )
}

export default CategoriesList;
