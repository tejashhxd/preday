import "../Style/Authentication.css";
import { useState } from "react";

export default function Authentication({ setUser }) {
  const [state, setState] = useState("Login");
  const [message, setMessage] = useState(null);
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

  const getUser = (username, password) => {
    fetch(`${BASE_LINK}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data);
        console.log(message.map((message) => message.message));
      })
      .catch((err) => {
        console.log("unable to login", err);
      });
  };

  const createUser = (username, password) => {
    fetch(`${BASE_LINK}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data);
        console.log(message.map((message) => message.message));
      })
      .catch((err) => {
        console.log("unable to register", err);
      });
  };

  // const getTaks = () => {
  //   fetch(`${BASE_LINK}/user/tejash/tejash/task`)
  //     .then(res => res.json())
  //     .then(data => console.log(data))
  //     .catch(err => console.log(err))
  // };

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
          <button
            onClick={() => {
              const username = getUsername();
              const password = getPassword();
              if (state === "Login") {
                getUser(username, password);
                setUser(username);
              } else {
                createUser(username, password);
                setUser(username);
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
              state === "Login" ? setState("Register") : setState("Login");
            }}
          >
            {state === "Login" ? "Register" : "Login"}
          </div>
        </div>
      </div>
    </>
  );
}
