import Navbar from "./Navbar";
import Tasks from "./Upcoming";
import { useState, useEffect } from "react";

export default function Home({ userLogOut }) {
  const [currCategory, setCurrCategory] = useState("Tasks");
  const [categories, setCategories] = useState(new Set(["Tasks"]));
  const BASE_LINK = process.env.REACT_APP_BASE_LINK;

  const getCsrfToken = () => {
    return localStorage.getItem("csrf_token");
  };

  async function getCat() {
    try {
      const response = await fetch(`${BASE_LINK}/task`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": getCsrfToken(),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.err || "something went error");
      }

      if (data) {
        if (data.category) {
          const categorySet = new Set(
            data.map((task) => task.category).filter((category) => category),
          );

          setCategories(categorySet);

        }
      }
    } catch (err) {
      console.log("error: ", err);
    }
  }

  useEffect(() => {
    getCat();
  }, []);

  return (
    <>
      <Navbar
        userLogOut={userLogOut}
        setCurrCategory={setCurrCategory}
        setCategories={setCategories}
        categories={categories}
      />
      <Tasks currCategory={currCategory} />
    </>
  );
}
