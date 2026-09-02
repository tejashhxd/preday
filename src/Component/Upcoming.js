import "../Style/upcoming.css";
import { useState, useEffect, useRef, useCallback } from "react";

export default function Tasks({currCategory}) {
  const BASE_LINK = process.env.REACT_APP_BASE_LINK;
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

  const getTask = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_LINK}/task`, {
        method: "GET",
        credentials: "include",
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
  }, [BASE_LINK])

  const getCsrfToken = () => {
    return localStorage.getItem("csrf_token");
  }

  async function addTask(task, description, date) {
    try {
      const response = await fetch(`${BASE_LINK}/task`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": getCsrfToken()
        },
        body: JSON.stringify({
          task: task,
          description: description,
          date: date,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "something went wrong");
      }

      await getTask();

      console.log(task);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function deleteTask(id) {
    try {
      const response = await fetch(`${BASE_LINK}/task`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": getCsrfToken()
        },
        body: JSON.stringify({
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

  async function editTask(id, task, description, date) {
    try {
      const response = await fetch(`${BASE_LINK}/task`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "Application/json",
          "X-CSRF-TOKEN": getCsrfToken()
        },
        body: JSON.stringify({
          id: id,
          task: task,
          description: description,
          date: date,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "something went wrong");
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  function TaskDiv({
    task,
    id,
    description,
    date,
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
            onClick={() => {
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
          <div className="sidebar-header-maintext">Task</div>
          <div className="sidebar-input-holder">
            <input
              type="text"
              className="add-task"
              id="editedTask"
              defaultValue={currTask}
            ></input>
          </div>
        </div>
        <div className="sidebar-main">
          <div className="sidebar-main-maintext">Description</div>
          <div className="sidebar-input-holder">
            <textarea
              className="add-description"
              type="text"
              id="editedDescription"
              defaultValue={currDescriptioon}
            ></textarea>
          </div>
          <div className="sidebar-main-duedate-holder">
            <div className="sidebar-main-duedate-maintext">Due date: </div>
            <input
              type="date"
              className="sidebar-main-duedate"
              id="editedDate"
              defaultValue={currDate}
            ></input>
          </div>
        </div>
        <div className="sidebar-footer">
          <div className="delete-task">
            <button
              onClick={() => {
                deleteTask(idUnderWork);
                setIsSidebarActive(false);
              }}
            >
              Delete task
            </button>
          </div>
          <div className="confirm">
            <button
              onClick={() => {
                const task = getTaskFrmUser();
                const description = getDescriptionFrmUser();
                const date = getDateFrmUser();
                editTask(idUnderWork, task, description, date);
                setRefresh("true");
                setIsSidebarActive(false);
              }}
            >
              Save changes
            </button>
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
    addTask,
  }) {
    return (
      <>
        <div
          ref={addTaskRef}
          className={
            isAddTaskActive === true ? "sidebar sidebar-active" : "sidebar"
          }
        >
          <div className="close-sidebar">
            <i
              class="fa-solid fa-xmark close-icon"
              onClick={() => {
                setIsAddTaskActive(false);
              }}
            ></i>
          </div>
          <div className="sidebar-header">
            <div className="sidebar-header-maintext">Task</div>
            <div className="sidebar-input-holder">
              <input
                type="text"
                className="add-task"
                placeholder="Enter task here"
                id="newTask"
              ></input>
            </div>
          </div>
          <div className="sidebar-main">
            <div className="sidebar-main-maintext">Description</div>
            <div className="sidebar-input-holder">
              <textarea
                className="add-description"
                type="text"
                placeholder="Description"
                id="newDescription"
              ></textarea>
            </div>
            <div className="sidebar-main-duedate-holder">
              <div className="sidebar-main-duedate-maintext">Due date : </div>
              <input
                type="date"
                className="sidebar-main-duedate"
                id="newDate"
              ></input>
            </div>
          </div>
          <div className="sidebar-footer addtask-footer">
            <div className="confirm">
              <button
                className="btn"
                onClick={() => {
                  const task = getTaskFrmUser();
                  const description = getDescriptionFrmUser();
                  const date = getDateFrmUser();
                  addTask(task, description, date);
                  setIsAddTaskActive(false);
                }}
              >
                Add task
              </button>
            </div>
          </div>
          <div className="filler"></div>
        </div>
      </>
    );
  }

  const getTaskFrmUser = () => {
    if (isSidebarActive === true) {
      const task = document.getElementById("editedTask").value;
      return task;
    }

    if (isAddTaskActive === true) {
      const task = document.getElementById("newTask").value;
      return task;
    }
  };

  const getDescriptionFrmUser = () => {
    if (isSidebarActive === true) {
      const description = document.getElementById("editedDescription").value;
      return description;
    }

    if (isAddTaskActive === true) {
      const description = document.getElementById("newDescription").value;
      return description;
    }
  };

  const getDateFrmUser = () => {
    if (isSidebarActive === true) {
      const date = document.getElementById("editedDate").value;
      return date;
    }

    if (isAddTaskActive === true) {
      const date = document.getElementById("newDate").value;
      return date;
    }
  };

  useEffect(() => {
    getTask();
    setRefresh("");
  }, [refresh, getTask]);

  return (
    <>
      <Sidebar
        isSidebarActive={isSidebarActive}
        idebarRef={sidebarRef}
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
        addTask={addTask}
      />
      <div className="main">
        <div className="header">{currCategory}</div>
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
