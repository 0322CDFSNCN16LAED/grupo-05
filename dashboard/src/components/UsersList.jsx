import { useState, useEffect } from "react"

function UsersList() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch("http://localhost:3030/api/user")
        .then(response => {
        console.log(response)
        response.json()})
        .then(data => {
            setUsers(data.result)
        })
        .catch(error => console.error(error))
    },[])

    useEffect(() => {
        console.log("actualizado")
    }, [users])

    return(
        <>
        <h2> Usuarios: </h2>

        <ul>
        {users.map((user, i) => {
            return(
                <li key={i}>
                    <h3> {user.fullName} </h3>
                </li>
            )
        })
        }
        </ul>

        </>
    )
}

export default UsersList;
