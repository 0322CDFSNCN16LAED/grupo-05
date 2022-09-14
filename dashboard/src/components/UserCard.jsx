import React from "react";
import { useState, useEffect } from "react"
import {Link} from "react-router-dom"

function UserCard() {

    const [usersCount, setUsersCount] = useState([])

    async function fetchData() {
        const result = await fetch("http://localhost:3030/api/user");
        const jsonResult = await result.json();
        const data = await jsonResult.data;
        setUsersCount(data.count)
    }

    useEffect(() =>  {
        fetchData();
    },[])

    return(
        <>
            < div className="d-flex mb-4" >
                <div className={`card border-left-primary shadow py-2`}>
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">

                                <div className="h5 mb-0 font-weight-bold text-gray-800">

                                    <h2> Cantidad de usuarios:{usersCount} </h2>
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

        </>
    )
}

export default UserCard;
 