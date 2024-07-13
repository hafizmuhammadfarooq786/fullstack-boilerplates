import React, { useEffect, useState } from 'react';
import './App.css';
import Auth from './Auth';
import Users from './Users';


function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const user = window.sessionStorage.getItem("user");
console.log("user", user)
  useEffect(() => {
      if(user)
        setAuthenticated(true);
  }, [user]);

  return (
    <div className="App">
      {isAuthenticated ?<Users />:<Auth/>}
    </div>
  );
}

export default App;
