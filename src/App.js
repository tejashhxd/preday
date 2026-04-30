import Authentication from "./Component/Authentication";
import "./App.css";
import Home from "./Component/Home";
import { useState, useEffect } from "react";

function App() {
  
  const [username, setUsername] = useState(null);
  useEffect(() => {
    const saved = localStorage.getItem("authUser");
    if (saved) setUsername(JSON.parse(saved));
  }, []);

  const handleAuth = (value) => {
    localStorage.setItem("authUser", JSON.stringify(value));
    setUsername(value);
  };

  const logOut = () => {
    localStorage.removeItem("authUser");
    setUsername(null);
  };

  return (
    <>{username === null ? <Authentication setUsername={handleAuth} /> : <Home logOut={logOut} username={username} /> } </>
  );
}

export default App;
