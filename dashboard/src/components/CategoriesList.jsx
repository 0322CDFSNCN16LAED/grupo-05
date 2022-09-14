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
                <div className="d-flex mb-4">
                    <div className={`card border-left-danger shadow py-2`}>
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">

                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        <li key={i}>
                                            <h3> {category.name} </h3>
                                            <p> Cantidad de servicios registrados: {category.service.length} </p>
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
    )
}

export default CategoriesList;
