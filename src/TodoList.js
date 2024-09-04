import { useState, useEffect } from "react";
import "./style/styles.css";
import AddTask from "./components/AddTask";
import ActionButtons from "./components/ActionButtons";
import UpdateTask from "./components/UpdateTask";
import SortBy from "./components/SortBy";
import { useDispatch } from "react-redux";
import { setTasks } from "./reducers/taskReducer";
import { useSelector } from "react-redux";
import CheckedActions from "./components/CheckedActions";
function TodoList() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const [addTask, setAddTask] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(-1);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editExpiry, setEditExpiry] = useState("");
  const [expandedDescriptionIndex, setExpandedDescriptionIndex] = useState(-1);
  const [checked, setChecked] = useState([]);
  const [showChecks, setShowChecks] = useState(false);
  const [originalTasks, setOriginalTasks] = useState([]);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(
    2,
    "0"
  )}T${String(currentDate.getHours()).padStart(2, "0")}:${String(
    currentDate.getMinutes()
  ).padStart(2, "0")}`;

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((response) => response.json())
      .then((data) => {
        dispatch(setTasks(data));
        setOriginalTasks(data);
      })
      .catch((error) => {
        alert(`Failed to fetch tasks: ${error.message}`);
      });
  }, []);

  const addNewTask = () => {
    setAddTask(!addTask);
  };

  let cmp = 0;

  const completedTasks = tasks.map((task) => {
    if (task.completed === true) cmp++;
    return null;
  });

  let expired = 0;

  const expiredTasks = tasks.map((task) => {
    if (task.expiry < formattedDate && task.completed === false) expired++;
    return null;
  });

  const checkTask = (id) => {
    if (checked.includes(id)) {
      setChecked(checked.filter((check) => check !== id));
    } else {
      setChecked([...checked, id]);
    }
  };

  const seeMore = (id) => {
    if (expandedDescriptionIndex !== id) setExpandedDescriptionIndex(id);
    else setExpandedDescriptionIndex(-1);
  };

  return (
    <div className="container">
      <div className="lists">
        <div className="header">
          <h2>Todo List</h2>
          <SortBy
            tasks={tasks}
            setTasks={setTasks}
            originalTasks={originalTasks}
          />
          <button onClick={addNewTask}>Add New Task</button>
        </div>
        {tasks.length === cmp ? (
          <div className="counts">
            <p>Well done. All tasks are Completed.</p>
          </div>
        ) : (
          <div className="counts">
            <p>Completed: {cmp}</p>
            <p>Missed: {expired}</p>
            <p>Remaining: {tasks.length - cmp - expired}</p>
          </div>
        )}
        <CheckedActions
          checked={checked}
          setChecked={setChecked}
          showChecks={showChecks}
          setShowChecks={setShowChecks}
          formattedDate={formattedDate}
        />
        {addTask && (
          <AddTask
            addTask={addTask}
            setAddTask={setAddTask}
            tasks={tasks}
            setTasks={setTasks}
          />
        )}
        <ul>
          {tasks.map((item) => (
            <li key={item.id}>
              {updateIndex !== item.id ? (
                <div
                  className={`${item.expiry < formattedDate ? "expired" : ""}`}
                >
                  <div className="heading">
                    <div className="titleCheck">
                      {showChecks && (
                        <input
                          type="checkbox"
                          checked={checked.includes(item.id)}
                          onChange={() => checkTask(item.id)}
                        />
                      )}
                      <h3
                        className={`title ${item.completed ? "completed" : ""}`}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <ActionButtons
                      item={item}
                      tasks={tasks}
                      setTasks={setTasks}
                      setUpdateIndex={setUpdateIndex}
                      setEditTitle={setEditTitle}
                      setEditDescription={setEditDescription}
                      setEditExpiry={setEditExpiry}
                      formattedDate={formattedDate}
                    />
                  </div>
                  <div className="fullDescription ">
                    <p
                      className={`description 
                      ${item.completed ? "completed" : ""}
                      ${
                        expandedDescriptionIndex === item.id ? "" : "truncate"
                      }`}
                      onClick={() => seeMore(item.id)}
                    >
                      {item.description}
                    </p>
                  </div>
                  <div className="date">
                    {item.createdAt && (
                      <p>
                        Created Date:{" "}
                        <span>{item.createdAt.split("T").join(" ")}</span>
                      </p>
                    )}
                    {item.expiry < formattedDate && <p>Expired</p>}
                    {item.expiry && (
                      <p>
                        Expiry Date:{" "}
                        <span>{item.expiry.split("T").join(" ")}</span>
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <UpdateTask
                  editTitle={editTitle}
                  setEditTitle={setEditTitle}
                  editDescription={editDescription}
                  setEditDescription={setEditDescription}
                  editExpiry={editExpiry}
                  setEditExpiry={setEditExpiry}
                  tasks={tasks}
                  setTasks={setTasks}
                  updateIndex={updateIndex}
                  setUpdateIndex={setUpdateIndex}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
