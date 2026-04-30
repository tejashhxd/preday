import "../Style/Authentication.css";
import { useState } from "react";

export default function Authentication({ setUsername }) {
  const [state, setState] = useState("Login");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState("");
  const BASE_LINK = "https://predaybackend.onrender.com";

  const getUsername = () => {
    const username = document.getElementById("username").value;
    console.log(username);
    return username;
  };

  const getPassword = () => {
    const password = document.getElementById("password").value;
    console.log(password);
    return password;
  };


  async function getUser(username, password) {
    try{
      const response = await fetch(`${BASE_LINK}/login`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "username": username,
          "password": password
        })
      });

      const data = await response.json();

      if(!response.ok){
        throw new Error(data.message || "Something went wrong")
      }

      if(data.message){
        console.log("true");
        setMessage("User");
      }

      if(data.error){
        console.log("false");
        setError(data.error);
      }

    } catch(error) {
      console.log("Error", error.message);
    }

  }

  async function createUser(username, password) {
    try{
      const response = await fetch(`${BASE_LINK}/register`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
          "username": username,
          "password": password
        })
      });

      const data = await response.json();

      if(!response.ok){
        throw new Error(data.error || "something went wrong")
      }

      console.log(data.message);

    } catch(err) {
      console.log("Error:", err.message);
    }
  }




  return (
    <>
      <div id="authentication-body">
        <div className="credential-box">
          <div className="credential-header">{state}</div>
          <input
            type="text"
            id="username"
            placeholder={state === "Login" ? "username" : "Set username"}
          />
          <input
            type="password"
            id="password"
            placeholder={state === "Login" ? "Password" : "Create Password"}
          />
          {error && <div id="error">{error}</div>}
          <button
            onClick={() => {
              const username = getUsername();
              const password = getPassword();
              if (state === "Login") {
                getUser(username, password);
                if(message === "User"){
                  setError("");
                  console.log("logging in....");
                  setUsername(username);
                } else {
                  setError(message);
                }
              } else {
                createUser(username, password);
                setUsername(username);
              }
            }}
          >
            Next
          </button>
        </div>
        <div className="credential-footer">
          {state === "Login" ? "New to Preday?" : "Already have an account?"}{" "}
          <div
            className="switch decor"
            onClick={() => {
              if(state === "Login"){
                setError("");
                setState("register");
              }else{
                setError("");
                setState("Login");
              }
            }}
          >
            {state === "Login" ? "Register" : "Login"}
          </div>
        </div>
      </div>
    </>
  );
}
