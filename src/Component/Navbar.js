import "../Style/navbar.css";
import { useState, useEffect, useRef } from "react";

export default function Navbar({ userLogOut }) {
  const [menu, setMenu] = useState("");
  const menuRef = useRef();
  const menuBarRef = useRef();

  useEffect((e) => {
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
  });

  return (
    <>
      <div
        className={menu === "active" ? "menu menu-active" : "menu"}
        ref={menuRef}
      >
        <div className="menu-header">TASKS</div>
        <div className="tasks">
          <div>
            <i className="fa-solid fa-angles-right task-icon"></i>
          </div>
          <div>Upcoming</div>
        </div>
        <div className="tasks">
          <div>
            <i class="fa-solid fa-bars-progress task-icon"></i>
          </div>
          <div>Today</div>
        </div>
        <div className="tasks">
          <div>
            <i class="fa-solid fa-calendar-days task-icon"></i>{" "}
          </div>
          <div>Calendar</div>
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
