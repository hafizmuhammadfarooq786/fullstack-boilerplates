import { useMutation, gql } from "@apollo/client";
import { useState } from "react";

const UPDATE_USER = gql`
    mutation UpdateUser($updateUserId: ID!, $name: String!) {
        updateUser(id: $updateUserId, name: $name) {
            id
            name
            email
        }
    }
`

const DELETE_USER = gql`
    mutation DeleteUser($deleteUserId: ID!) {
        deleteUser(id: $deleteUserId)
    }
`

const Modal = ({ user, onClose }) => {
    const [ updatedUser ] = useMutation(UPDATE_USER);
    const [ deleteUser ] = useMutation(DELETE_USER);
    const [loading, setLoading] = useState(false);
    const [updatedName, setUpdatedName] = useState(user.name);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if(updatedName !== user.name){
            try{
                const { data } = await updatedUser({ variables: {updateUserId: user.id, name: updatedName } });
                if(data)
                    onClose();
            }catch(err){
                alert(err.message || 'An error occurred during update');
            }
        }else{
            onClose();
        }
    }

    const handleDelete = async(e) => {
        e.preventDefault();
        setLoading(true);
            try{
                const { data } = await deleteUser({ variables: {deleteUserId: user.id } });
                if(data)
                    onClose();
                    window.location.reload();
            }catch(err){
                alert(err.message || 'An error occurred during delete');
            }
    }

    return (
        <div className="modal">
            <div className="card">
                <h1 style={{textAlign: 'center', color: (user.id && !user.name) ? 'red': 'green'}}> {(user.id && !user.name) ?  'Delete User' :'Update User'}</h1>
                {(user.id && user.name) ? (
                    <form className="form">
                        <div className="form_container">
                            <label>Your name</label>
                            <input name="name" value={updatedName} type="text" placeholder="Enter full name" 
                                onChange={(e) => {
                                    if(e.target.value.length){
                                        setUpdatedName(e.target.value);
                                    }else{
                                        setUpdatedName(user.name);
                                    }
                                }} 
                            />
                        </div>
                        <div className="form_container">
                            <button disabled={loading} className={loading ? "submit_button_processing" : "submit_button"} type="submit" onClick={handleSubmit}>{loading ? 'Processing...' : 'Update User'}</button>
                        </div>
                    </form>
                    ):(
                    <div className="form_container">
                        <p style={{textAlign: 'center'}}>Are you sure you want to permanently delete this user? This action cannot be revoked.</p>
                        <button disabled={loading} className={loading ? "submit_button_processing" : "submit_button"} type="submit" onClick={handleDelete}>{loading ? 'Processing...' : 'Delete User'}</button>
                    </div>
                )}
            </div>
        </div>
    )

}

export default  Modal;