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
        <h2> Cantidad de usuarios:{usersCount} </h2>

        </>
    )
}

export default UserCard;
