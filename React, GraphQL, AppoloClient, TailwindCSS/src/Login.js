import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            user {
                id
                name
                email
            }
            token
        }
    }
`
const Login = ({ showSignup }) => {
    const [ loginUser ] = useMutation(LOGIN_USER);
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });

    const handleSubmit  = async (e) => {
        e.preventDefault();
        if(formValues.email && formValues.password){
            setLoading(true);
            try {
                const { data } = await loginUser({ variables: formValues });
                if (data) {
                    const { login } = data;
                    setLoading(false);
                    window.sessionStorage.setItem("user", JSON.stringify(login.user));
                    window.sessionStorage.setItem("token", login.token);
                    window.location.reload();
                }
            } catch (err) {
                setLoading(false);
                alert(err.message || 'An error occurred during login');
            }
        }
    }

    const handleChange = (e) => 
        setFormValues({...formValues, [e.target.name]: e.target.value});

    return (
        <div className="card">
            <h1>Login</h1>
            <form className="form">
                <div className="form_container">
                    <label>Email address</label>
                    <input name="email" type="email" placeholder="Enter email address" onChange={handleChange} />
                </div>
                <div className="form_container">
                    <label>Password</label>
                    <input name="password" type="password" placeholder="Password min 6 characters" onChange={handleChange} />
                </div>
                <div className="form_container">
                <label onClick={() => showSignup(false)}>Don't have an account, <span style={{textDecoration: 'underline', cursor: 'pointer'}}>Signup!</span></label>
            </div>
                <div className="form_container">
                    <button disabled={loading} className={loading ? "submit_button_processing" : "submit_button"} type="submit" onClick={handleSubmit}>{loading ? 'Processing...' : 'Login'}</button>
                </div>
            </form>
        </div>
    )
}

export default Login;