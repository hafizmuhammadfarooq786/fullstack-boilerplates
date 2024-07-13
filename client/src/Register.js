import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const SIGNUP_USER = gql`
    mutation Signup($name: String!, $email: String!, $password: String!) {
        signup(name: $name, email: $email, password: $password) {
            id
            name
            email
        }
    }
`

const Register = ({ showLogin }) => {
    const [ signupUser ] = useMutation(SIGNUP_USER);
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit  = async (e) => {
        e.preventDefault();
        if(formValues.name && formValues.email && formValues.password){
            setLoading(true);
            try {
                const { data } = await signupUser({ variables: formValues });
                if(data){
                    alert("Successfully created new user");
                    showLogin(true);
                }
            } catch (err) {
                setLoading(false);
                alert(err.message || 'An error occurred during register');
            }
        }else{
        }
    }

    const handleChange = (e) => 
        setFormValues({...formValues, [e.target.name]: e.target.value});

    return (
        <div className="card">
            <h1>Register</h1>
            <form className="form">
                <div className="form_container">
                    <label>Your name</label>
                    <input name="name" required type="text" placeholder="Enter full name" onChange={handleChange} />
                </div>
                <div className="form_container">
                    <label>Email address</label>
                    <input name="email" required type="email" placeholder="Enter email address" onChange={handleChange} />
                </div>
                <div className="form_container">
                    <label>Password</label>
                    <input name="password" required type="password" placeholder="Password min 6 characters" onChange={handleChange} />
                </div>

                <div className="form_container">
                    <label onClick={() => showLogin(true)}>Already have an account, <span style={{textDecoration: 'underline', cursor: 'pointer'}}>Login!</span></label>
                </div>

                <div className="form_container">
                    <button disabled={loading} className={loading ? "submit_button_processing" : "submit_button"} type="submit" onClick={handleSubmit}>{loading ? 'Processing...' : 'Register'}</button>
                </div>
            </form>
        </div>
    )
}

export default Register