import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import Modal from "./modal";

const GET_USERS = gql`
    query GetUsers{
        getUsers {
            id
            name
            email
        }
    }
`

const Users = () => {
    const [users, setUsers] = useState(null);
    const { data } = useQuery(GET_USERS);
    useEffect(() => {
        if(data){
            const {getUsers} = data;
            setUsers(getUsers);
        }
    }, [data]);

    const [modal, setModal] = useState(false);
    const [selectedUser, setUser] = useState(null);
    
    const handleButtonAction = (user) =>  {setModal(true); setUser(user);}
    const handleClose = async () => setModal(false);

    return users ? (
        <div className="App">
            <h1>Users CRUD Application</h1>
            <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map(({ id, name, email }) => 
                        <tr key={id}>
                            <td>{name}</td>
                            <td>{email}</td>
                            <td><button className='edit_button' onClick={() => handleButtonAction({id, name})}>Edit User</button></td>
                            <td><button className='delete_button' onClick={() => handleButtonAction({id})}>Delete User</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
            {modal && <Modal user={selectedUser} onClose={handleClose} />}
        </div>):(
        <div className="App">
            <h1>Users CRUD Application</h1>
            <br />
            <p>Loading...</p>
        </div>
    )
}

export default Users;