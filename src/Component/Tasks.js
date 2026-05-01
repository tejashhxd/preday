import "../Style/tasks.css";
import { useState, useEffect } from "react";

export default function Tasks({ username }) {
  const BASE_LINK = "https://predaybackend.onrender.com";
  const [data, setData] = useState([]);
  const [addtask, setAddtask] = useState("");
  const [task, setTask] = useState("");
  const [refresh, setRefresh] = useState("");

  

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

  async function addTask(username, task) {
    try {
      const response = await fetch(`${BASE_LINK}/task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          task: task,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "something went wrong");
      }

      await getTask(username);
      console.log(task);
      setAddtask("");
      setTask("");
    } catch (err) {
      console.log(err.message);
    }
  }

  async function deleteTask(username, id) {
    try{
      const response = await fetch(`${BASE_LINK}/task`,{
        method:"DELETE",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "username": username,
          "id": id
        })
      });

      const data = await response.json();

      if(!response.ok){
        throw new Error(data.error || "something went error");
      }

      setRefresh("refresh");

    }catch(err){
      console.log(err.message);
    }
  }

  function TaskDiv({ task, id, username, deleteTask}) {
    return (
      <>
        <div className="task-body">
          <div className="task-name">{task}</div>
          <div 
          className="task-delete"
          onClick={() => {
            deleteTask(username, id)
            }}>Delete</div>
        </div>
      </>
    );
  }

  useEffect(() => {
    console.log(username);
    getTask(username);
    setRefresh("");

  }, [username, refresh]);

  return (
    <>
      <div className="main">
        <div className="header">
          <span className="decor">PLAN</span> your day efficiently{" "}
        </div>
        <div className="functions">
          {addtask === "" ? (
            <div
              className="tool"
              onClick={() => {
                setAddtask("active");
              }}
            >
              create new task
            </div>
          ) : (
            <div className="add_task">
              <input
                type="text"
                placeholder="Add task"
                id="task"
                value={task}
                onChange={(e) => {
                  setTask(e.target.value);
                }}
              ></input>
              <button
                onClick={() => {
                  addTask(username, task);
                }}
              >
                Add
              </button>
            </div>
          )}
        </div>
        <div className="task-container">
          {data.map((tasks) => (
            <TaskDiv key={tasks.id} task={tasks.task} id={tasks.id} username={username} deleteTask={deleteTask} />
          ))}
        </div>
      </div>
    </>
  );
}
