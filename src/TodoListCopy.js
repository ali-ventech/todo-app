import { useState } from "react";
import todoData from "../src/data.json";
import "./style/styles.css";

function TodoList() {
  const [tasks, setTasks] = useState(todoData);
  const [addTask, setAddTask] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [updateIndex, setUpdateIndex] = useState(-1);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [expandedDescriptionIndex, setExpandedDescriptionIndex] = useState(-1);
  const [sortOption, setSortOption] = useState("time");
  const [checked, setChecked] = useState([]);
  const [showChecks, setShowChecks] = useState(false);

  const addNewTask = () => {
    setAddTask(!addTask);
  };

  let cmp = 0;

  const completedTasks = tasks.map((task) => {
    if (task.completed === true) cmp++;
    return null;
  });

  const setNewTask = () => {
    if (newTitle) {
      setTasks([
        ...tasks,
        { title: newTitle, description: newDescription, completed: false },
      ]);
      setNewTitle("");
      setNewDescription("");
      setAddTask(!addTask);
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task, index) => index !== id));
  };

  const completeTask = (id) => {
    setTasks(
      tasks.map((task, index) => {
        if (index === id) {
          return { ...task, completed: true };
        } else {
          return task;
        }
      })
    );
  };

  const updateTaskIndex = (id) => {
    setUpdateIndex(id);
    setEditTitle(tasks[id].title);
    setEditDescription(tasks[id].description);
  };

  const saveUpdatedTask = () => {
    setTasks(
      tasks.map((task, index) => {
        if (index === updateIndex) {
          return { ...task, title: editTitle, description: editDescription };
        } else {
          return task;
        }
      })
    );
    setUpdateIndex(-1);
    setEditTitle("");
    setEditDescription("");
  };

  const seeMore = (id) => {
    if (expandedDescriptionIndex !== id) setExpandedDescriptionIndex(id);
    else setExpandedDescriptionIndex(-1);
  };

  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);

    let sortedTasks = [...tasks];
    if (option === "title") {
      sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (option === "completed") {
      sortedTasks.sort((a, b) => a.completed - b.completed);
    } else {
      sortedTasks = [...todoData];
    }

    setTasks(sortedTasks);
  };

  const toggleChecks = () => {
    setShowChecks(!showChecks);
  };

  const checkTask = (id) => {
    if (checked.includes(id)) {
      setChecked(checked.filter((check) => check !== id));
    } else {
      setChecked([...checked, id]);
    }
  };

  const deleteChecked = () => {
    setTasks(tasks.filter((task, index) => !checked.includes(index)));
    setChecked([]);
  };

  const completeChecked = () => {
    setTasks(
      tasks.map((task, index) => {
        if (checked.includes(index)) {
          return { ...task, completed: true };
        } else {
          return task;
        }
      })
    );
    setChecked([]);
  };

  return (
    <div className="container">
      <div className="lists">
        <div className="header">
          <h2>Todo List</h2>
          <div className="sortBy">
            <label htmlFor="sort">Sort By: </label>
            <select id="sort" value={sortOption} onChange={handleSortChange}>
              <option value="time" selected hidden>
                Time
              </option>
              <option value="title">Title</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button onClick={addNewTask}>Add New Task</button>
        </div>
        {tasks.length === cmp ? (
          <div className="counts">
            <p>Well done. All tasks are Completed.</p>
          </div>
        ) : (
          <div className="counts">
            <p>Completed: {cmp}</p>
            <p>Remaining: {tasks.length - cmp}</p>
          </div>
        )}
        <div className="showChecks">
          {checked.length === 0 ? (
            <button onClick={toggleChecks}>Select</button>
          ) : (
            <>
              <button className="deleteBtn" onClick={deleteChecked}>
                Delete
              </button>
              <button onClick={completeChecked}>Complete</button>
              <p>{checked}</p>
            </>
          )}
        </div>
        {addTask && (
          <div className="input">
            <h4>Add Task</h4>
            <input
              onChange={(e) => setNewTitle(e.target.value)}
              required
              type="text"
              placeholder="Title"
              value={newTitle}
            ></input>

            <textarea
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="description"
              rows={4}
              value={newDescription}
            ></textarea>
            <button onClick={setNewTask}>Add Task</button>
          </div>
        )}
        <ul>
          {tasks.map((item, index) => (
            <li key={index}>
              {updateIndex !== index ? (
                <div>
                  <div className="heading">
                    <div className="titleCheck">
                      {showChecks && (
                        <input
                          type="checkbox"
                          checked={checked.includes(index)}
                          onChange={() => checkTask(index)}
                        />
                      )}
                      <h3
                        className={`title ${item.completed ? "completed" : ""}`}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <div className="buttons">
                      {!item.completed && (
                        <div>
                          <button
                            className="complete"
                            onClick={() => completeTask(index)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="forestgreen"
                            >
                              <path d="M0 12.116l2.053-1.897c2.401 1.162 3.924 2.045 6.622 3.969 5.073-5.757 8.426-8.678 14.657-12.555l.668 1.536c-5.139 4.484-8.902 9.479-14.321 19.198-3.343-3.936-5.574-6.446-9.679-10.251z" />
                            </svg>
                          </button>
                          <button
                            className="update"
                            onClick={() => updateTaskIndex(index)}
                          >
                            <svg
                              clip-rule="evenodd"
                              fill-rule="evenodd"
                              stroke-linejoin="round"
                              stroke-miterlimit="2"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="dodgerblue"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z"
                                fill-rule="nonzero"
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                      <button
                        className="delete"
                        onClick={() => deleteTask(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="firebrick"
                        >
                          <path d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="fullDescription">
                    <p
                      className={`description 
                      ${item.completed ? "completed" : ""}
                      ${expandedDescriptionIndex === index ? "" : "truncate"}`}
                      onClick={() => seeMore(index)}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="updateTask">
                  <h4>Update Task</h4>
                  <input
                    onChange={(e) => setEditTitle(e.target.value)}
                    value={editTitle}
                    type="text"
                    placeholder="Title"
                  ></input>

                  <textarea
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="description"
                    rows={4}
                    value={editDescription}
                  ></textarea>
                  <button onClick={saveUpdatedTask}>Update Task</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
