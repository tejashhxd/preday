import "../Style/Authentication.css";
import { useState } from "react";

export default function Authentication({ setUsername }) {
  const [state, setState] = useState("Login");
  const [message, setMessage] = useState("");
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
    try {
      const response = await fetch(`${BASE_LINK}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.message) {
        console.log("true");
        setMessage("");
        console.log("logging in....");
        setUsername(username);
      }

      if (data.error) {
        console.log("false");
        setMessage(data.error);
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  }

  async function createUser(username, password) {
    try {
      const response = await fetch(`${BASE_LINK}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "something went wrong");
      }

      if (data.message) {
        console.log(data.message);
        setMessage(data.message);
        // setUsername(username);
      }

      if (data.error) {
        console.log(data.error);
        setMessage(data.error);
      }
    } catch (err) {
      console.log("Error:", err.message);
    }
  }

  return (
    <>
      <div id="authentication-body">
        <div className="vfx" >
          <div className="vfx-header">{(state === "Login") ? "Welcome Back!" : "Create User"}</div>
          <div className="vfx-content">{(state === "Login") ? 
          "You can sign in to access with your existing account" : 
          "Plan your days wfficiently with us"}</div>
        </div>
        <div className="credential-box">
          <div className="credential-header">{state}</div>
          <input
            type="text"
            id="username"
            placeholder={state === "Login" ? "Username" : "Set username"}
          />
          <input
            type="password"
            id="password"
            placeholder={state === "Login" ? "Password" : "Create Password"}
          />
          {message && <div id="error">{message}</div>}
          <button
            onClick={() => {
              const username = getUsername();
              const password = getPassword();
              if (state === "Login") {
                getUser(username, password);
              } else {
                createUser(username, password);
              }
            }}
          >
            {state === "Login" ? "Sign in" : "sign up"}
          </button>
          <div className="credential-footer">
            {state === "Login" ? "New to Preday?" : "Already have an account?"}{" "}
            <div
              className="switch decor"
              onClick={() => {
                if (state === "Login") {
                  setMessage("");
                  setState("Register");
                } else {
                  setMessage("");
                  setState("Login");
                }
              }}
            >
              {state === "Login" ? "Register" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
