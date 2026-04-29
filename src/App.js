import Authentication from "./Component/Authentication";
import "./App.css";
import Register from "./Component/Register";
import { useState, useEffect } from "react";

function App() {
  
  const [user, setUser] = useState(null);
  useEffect(() => {
    const saved = localStorage.getItem("authUser");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleAuth = (value) => {
    localStorage.setItem("authUser", JSON.stringify(value));
    setUser(value);
  };

  const logOut = () => {
    localStorage.removeItem("authUser");
    setUser(null);
  };

  return (
    <>{user === null ? <Authentication setUser={handleAuth} /> : <Register logOut={logOut}/>}</>
  );
}

export default App;
