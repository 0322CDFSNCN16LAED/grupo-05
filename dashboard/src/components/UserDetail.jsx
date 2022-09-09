import React from "react";
import { useState, useEffect } from "react"
import {Link} from "react-router-dom"

function UserDetail(props) {
    const id = props.match.params.id;

    const [user, setUser] = useState([])

    async function fetchData() {
        
        const result = await fetch(`http://localhost:3030/api/user/${id}`);
        const jsonResult = await result.json();
        const data = await jsonResult.data;
        setUser(data)
    }


    useEffect(() =>  {
        fetchData();
        //console.log("user: ", user)
    },[])

    if(!user){
        return(<div>Cargando...</div>)
    }
    return(
        <>
            <li>
                   <h3>Nombre Completo: {user.fullName} </h3>
                   <p> Email: {user.email} </p>
                   <p> ID:{user.id} </p>
            </li>
        </>
    )
}

export default UserDetail;
