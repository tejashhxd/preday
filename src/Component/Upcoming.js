import "../Style/upcoming.css";
import { useState, useEffect, useRef } from "react";

export default function Tasks({ username }) {
  const BASE_LINK = "https://predaybackend.onrender.com";
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState("");
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [isAddTaskActive, setIsAddTaskActive] = useState(false);
  const sidebarRef = useRef();
  const addTaskRef = useRef();
  const editTaskRef = useRef();
  const addTaskBtnRef = useRef();
  const [idUnderWork, setIdUnderWork] = useState("");
  const [currTask, setCurrTask] = useState("");
  const [currDescriptioon, setCurrDescription] = useState("");
  const [currDate, setCurrDate] = useState("");

  async function getTask(username) {
    try {
      const response = await fetch(`${BASE_LINK}/task?username=${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setData(data);
    } catch (err) {
      console.log("error:", err);
    }
  }

  async function addTask(username, task, description, date) {
    try {
      const response = await fetch(`${BASE_LINK}/task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          task: task,
          description: description,
          date: date,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "something went wrong");
      }

      await getTask(username);
      console.log(task);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function deleteTask(username, id) {
    try {
      const response = await fetch(`${BASE_LINK}/task`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          id: id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "something went error");
      }

      setRefresh("refresh");
    } catch (err) {
      console.log(err.message);
    }
  }

  function TaskDiv({
    task,
    id,
    username,
    description,
    date,
    deleteTask,
    setIdUnderWork,
  }) {
    return (
      <>
        <div className="task-body">
          <div className="task-left">
            <input type="checkbox" className="check"></input>
          </div>
          <div className="task-name">{task}</div>
          <div
            ref={editTaskRef}
            className="task-arrow"
            onClick={(e) => {
              setIsSidebarActive(true);
              setIdUnderWork(id);
              setCurrTask(task);
              setCurrDate(date);
              setCurrDescription(description);
            }}
          >
            <i class="fa-solid fa-angle-right"></i>
          </div>
        </div>
      </>
    );
  }

  function Sidebar({
    isSidebarActive,
    sidebarRef,
    username,
    idUnderWork,
    deleteTask,
    currTask,
    currDescriptioon,
    currDate,
  }) {
    return (
      <div
        ref={sidebarRef}
        className={
          isSidebarActive === true ? "sidebar sidebar-active" : "sidebar"
        }
      >
        <div className="close-sidebar">
          <i
            class="fa-solid fa-xmark close-icon"
            onClick={() => {
              setIsSidebarActive(false);
            }}
          ></i>
        </div>
        <div className="sidebar-header">
          <div className="sidebar-header-maintext">Task:</div>
          <div className="sidebar-input-holder">
            <input
              type="text"
              className="add-task"
              placeholder={currTask}
            ></input>
          </div>
        </div>
        <div className="sidebar-main">
          <div className="sidebar-main-maintext">Description:</div>
          <div className="sidebar-input-holder">
            <input
              className="add-description"
              type="text"
              placeholder={currDescriptioon}
            ></input>
          </div>
          <div className="sidebar-main-duedate-holder">
            <div className="sidebar-main-duedate-maintext">Due date: </div>
            <input
              type="date"
              className="sidebar-main-duedate"
              placeholder={currDate}
            ></input>
          </div>
        </div>
        <div className="sidebar-footer">
          <div className="delete-task">
            <button
              onClick={() => {
                deleteTask(username, idUnderWork);
                setIsSidebarActive(false);
              }}
            >
              Delete task
            </button>
          </div>
          <div className="confirm">
            <button>Edit task</button>
          </div>
        </div>
        <div className="filler"></div>
      </div>
    );
  }

  function AddTask({
    addTaskRef,
    getTaskFrmUser,
    getDescriptionFrmUser,
    getDateFrmUser,
    username,
    addTask
  }) {
    return (
      <>
        <div
          ref={addTaskRef}
          className={
            isAddTaskActive === true ? "sidebar sidebar-active" : "sidebar"
          }
        >
          <div className="sidebar-header">
            <div className="sidebar-header-maintext">Task:</div>
            <div className="sidebar-input-holder">
              <input
                type="text"
                className="add-task"
                placeholder="Enter task here"
                id="task"
              ></input>
            </div>
          </div>
          <div className="sidebar-main">
            <div className="sidebar-main-maintext">Description:</div>
            <div className="sidebar-input-holder">
              <input
                className="add-description"
                type="text"
                placeholder="Description"
                id="description"
              ></input>
            </div>
            <div className="sidebar-main-duedate-holder">
              <div className="sidebar-main-duedate-maintext">Due date: </div>
              <input
                type="date"
                className="sidebar-main-duedate"
                id="date"
              ></input>
            </div>
          </div>
          <div className="sidebar-footer">
            <div className="delete-task">
              <button
                onClick={() => {
                  setIsAddTaskActive(false);
                }}
              >
                Cancel
              </button>
            </div>
            <div className="confirm">
              <button
                onClick={() => {
                  const task = getTaskFrmUser();
                  const description = getDescriptionFrmUser();
                  const date = getDateFrmUser();
                  addTask(username, task, description, date);
                  setIsAddTaskActive(false);
                }}
              >
                Add task
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const getTaskFrmUser = () => {
    const task = document.getElementById("task").value;
    return task;
  };

  const getDescriptionFrmUser = () => {
    const description = document.getElementById("description").value;
    return description;
  };

  const getDateFrmUser = () => {
    const date = document.getElementById("date").value;
    return date;
  };

  useEffect(() => {
    getTask(username);
    setRefresh("");
  }, [username, refresh]);

  return (
    <>
      <Sidebar
        isSidebarActive={isSidebarActive}
        idebarRef={sidebarRef}
        username={username}
        idUnderWork={idUnderWork}
        deleteTask={deleteTask}
        currTask={currTask}
        currDescriptioon={currDescriptioon}
        currDate={currDate}
      />
      <AddTask
        addTaskRef={addTaskRef}
        getTaskFrmUser={getTaskFrmUser}
        getDescriptionFrmUser={getDescriptionFrmUser}
        getDateFrmUser={getDateFrmUser}
        username={username}
        addTask={addTask}
      />
      <div className="main">
        <div className="header">TODAY</div>
        <div className="add">
          <div>
            <i class="fa-solid fa-plus"></i>
          </div>
          <div
            ref={addTaskBtnRef}
            onClick={() => {
              setIsAddTaskActive(true);
            }}
          >
            Add New Task
          </div>
        </div>
        <div className="task-container">
          {data.map((tasks) => (
            <TaskDiv
              key={tasks.id}
              task={tasks.task}
              id={tasks.id}
              username={username}
              description={tasks.description}
              date={tasks.date}
              deleteTask={deleteTask}
              setIdUnderWork={setIdUnderWork}
            />
          ))}
        </div>
      </div>
    </>
  );
}
