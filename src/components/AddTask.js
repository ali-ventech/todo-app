// src/components/AddTask.js
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTaskAsync } from "../reducers/taskReducer";

export default function AddTask({ addTask, setAddTask }) {
  const dispatch = useDispatch();
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const setNewTask = () => {
    const currentDate = new Date();
    const formattedCreatedAt = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(
      2,
      "0"
    )}T${String(currentDate.getHours()).padStart(2, "0")}:${String(
      currentDate.getMinutes()
    ).padStart(2, "0")}`;

    if (newTitle) {
      const newTask = {
        title: newTitle,
        description: newDescription,
        createdAt: formattedCreatedAt,
        expiry: expiryDate,
        completed: false,
      };

      dispatch(addTaskAsync(newTask))
        .then(() => {
          setNewTitle("");
          setNewDescription("");
          setExpiryDate("");
          setAddTask(!addTask);
        })
        .catch((error) => {
          alert(`Failed to add task: ${error.message}`);
        });
    }
  };

  return (
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

      <label className="expiry" htmlFor="expirytime">
        Expiry:
      </label>

      <input
        type="datetime-local"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
        id="expirytime"
        name="expirytime"
      />
      <div>
        <button onClick={setNewTask}>Add Task</button>
        <button className="cancel" onClick={() => setAddTask(!addTask)}>
          Cancel
        </button>
      </div>
    </div>
  );
}
