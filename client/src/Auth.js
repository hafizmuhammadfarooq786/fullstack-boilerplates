import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Auth = ({setAuthenticated}) => {
    const [loginScreen, setLoginScreen] = useState(true);
    const handleScreen = (status) =>  setLoginScreen(status);

    return loginScreen ? <Login showSignup={handleScreen} setUser={setAuthenticated} /> : <Register showLogin={handleScreen}  />;
}

export default Auth;