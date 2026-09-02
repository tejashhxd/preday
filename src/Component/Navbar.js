import "../Style/navbar.css";
import { useState, useEffect, useRef } from "react";

export default function Navbar({
  userLogOut,
  setCurrCategory,
  setCategories,
  categories,
}) {
  const [menu, setMenu] = useState("");
  const [refresh, setRefresh] = useState("");
  const [isAddCategoryActive, setIsAddCategoryActive] = useState(false);
  const menuRef = useRef();

  const menuBarRef = useRef();

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
          <div>
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
  }, [refresh]);

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
