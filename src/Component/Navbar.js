import "../Style/navbar.css";
import { useState, useEffect, useRef } from "react";

export default function Navbar({
  userLogOut,
  setCurrCategory,
  setCategories,
  categories,
}) {
  const [menu, setMenu] = useState("");
  const [isAddCategoryActive, setIsAddCategoryActive] = useState(false);
  const [refresh, setRefresh] = useState("");
  const menuRef = useRef();
  const BASE_LINK = process.env.REACT_APP_BASE_LINK;

  const menuBarRef = useRef();

  const getCsrfToken = () => {
    return localStorage.getItem("csrf_token");
  }

  function AddCetgoryText() {
    return (
      <>
        <div
          onClick={(e) => {
            e.stopPropagation();
            setRefresh("Refresh");
            setIsAddCategoryActive(true);
            console.log("clicked addCategory");
          }}
        >
          <i className="fa-solid fa-plus"></i>
          Create New Category
        </div>
      </>
    );
  }

  function AddCetgory() {
    return (
      <>
        <div>
          <input placeholder="addCategory" id="categoryName"></input>
          <button
            onClick={(e) => {
              const categoryToAdd =
                document.getElementById("categoryName").value;

              e.stopPropagation();

              if(!categoryToAdd) return;

              setCategories((prev) => {
                const update = new Set(prev);
                update.add(categoryToAdd);
                return update;
              });

              setCurrCategory(categoryToAdd);
              setIsAddCategoryActive(false);
            }}
          >
            Add
          </button>
        </div>
      </>
    );
  }

  async function deleteCategory(categoryTodelete){
    try{
      const response = await fetch(`${BASE_LINK}/category`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": getCsrfToken()
        },
        body: JSON.stringify({
          category: categoryTodelete
        }),
      });

      const data = await response.json();

      if(!response.ok){
        throw new Error(data.error || "something went wrong");
      }

      setCategories((prev) => {
        const updated = new Set(prev);
        updated.delete(categoryTodelete);
        return updated;
      })

    }catch(err){
      console.log(err.message);
    }
  }

  function Category({ name }) {
    return (
      <>
        <div id={name} className="tasks">
          <div
            onClick={() => {
              setCurrCategory(name);
              setMenu("");
            }}
          >
            {name}
          </div>
          <div onClick={() => {
            deleteCategory(name);
          }}>
            <i className="category-delete fa-solid fa-trash-can"></i>
          </div>
        </div>
      </>
    );
  }

  useEffect(() => {
    const handleClick = (e) => {
      if (
        !menuRef.current.contains(e.target) &&
        !menuBarRef.current.contains(e.target)
      ) {
        setMenu("");
        console.log("closed menu");
      }
    };
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    setRefresh("");
  }, [refresh, setRefresh]);

  return (
    <>
      <div
        className={menu === "active" ? "menu menu-active" : "menu"}
        ref={menuRef}
      >
        <div className="menu-header">
          {isAddCategoryActive === false ? <AddCetgoryText /> : <AddCetgory />}
        </div>
        <div className="category-section">
          {[...categories].map((cat) => (
            <Category key={cat} name={cat} />
          ))}
        </div>
      </div>
      <div className="navbar">
        <div className="menu-bars">
          <i
            className="fa-solid fa-bars"
            ref={menuBarRef}
            onClick={() => {
              setMenu("active");
              console.log("clicked menu icon");
            }}
          ></i>
          <span className="decor logo">Preday</span>
        </div>
        <div className="userCred">
          <div
            className="logout"
            onClick={() => {
              userLogOut();
            }}
          >
            logout?
          </div>
        </div>
      </div>
    </>
  );
}
