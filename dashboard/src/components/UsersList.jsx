import React from "react";
import { useState, useEffect } from "react"
import {Link} from "react-router-dom"

function UsersList() {

    const [users, setUsers] = useState([])

    async function fetchData() {
        const result = await fetch("http://localhost:3030/api/user");
        const jsonResult = await result.json();
        const data = await jsonResult.data;
        setUsers(data.rows)
    }

    useEffect(() =>  {
        fetchData();
    },[])

    return(
        <>
        <h2> Usuarios: </h2>

        <ul>
         {users.map((user, i) => {
            return(
                < div className="d-flex mb-4" >
                    <div className={`card border-left-primary shadow py-2`}>
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">

                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        <li key={i}>
                                            <h3> {user.fullName} </h3>
                                            <p> Email: {user.email} </p>
                                            <p> ID:{user.id} </p>
                                            <Link type="button" className="btn btn-primary" to={`/user/${user.id}`}>
                                                Detalle del usuario
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
    )
}

export default UsersList;

