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
            < div className="d-flex mb-4" >
                <div className={`card border-left-primary shadow py-2`}>
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">

                                <div className="h5 mb-0 font-weight-bold text-gray-800">
                                    
                                        <h3>Nombre Completo: {user.fullName} </h3>
                                        <p> Email: {user.email} </p>
                                        <p> ID:{user.id} </p>
                                    
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

export default UserDetail;
