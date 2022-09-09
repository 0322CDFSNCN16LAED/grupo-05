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
                <li key={i}>
                   <h3> Nombre Completo: {user.fullName} </h3>
                   <p> Email: {user.email} </p>
                   <p> ID:{user.id} </p>
                   <Link to={`/user/${user.id}`}>
                        Detalle del usuario
                    </Link>
                </li>
           )
        })
        }
        </ul>

        </>
    )
}

export default UsersList;
