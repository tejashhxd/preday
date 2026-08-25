import Authentication from "./Component/Authentication";
import "./App.css";
import Home from "./Component/Home";
import { useState, useEffect } from "react";

function App() {
  const BASE_LINK = process.env.REACT_APP_BASE_LINK;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getCsrfToken = () => {
    return localStorage.getItem("csrf_token");
  }

  async function logout() {
    try {
      const response = await fetch(`${BASE_LINK}/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": getCsrfToken()
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "something went wrong");
      }

      if (data.message) {
        localStorage.removeItem("csrf_token");
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log("error: ", err);
      return false;
    }
  }

  // const data = await me();
  // if (data) {
  //   setIsLoggedIn(true);
  // }

  useEffect(() => {
    async function me() {
      try {
        const response = await fetch(`${BASE_LINK}/me`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "something went wrong");
        }

        if (data.id) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.log("error: ", err);
        return false;
      }
    }
    me();
  }, [isLoggedIn, BASE_LINK]);

  async function userLogout() {
    const done = await logout();
    if (done) {
      setIsLoggedIn(false);
    } else {
      console.log("something went wrong in logging out");
    }
  }

  return (
    <>
      {isLoggedIn === false ? (
        <Authentication setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Home userLogOut={userLogout} isloggedIn={isLoggedIn} />
      )}{" "}
    </>
  );
}

export default App;
