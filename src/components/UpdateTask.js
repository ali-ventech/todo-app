import { useDispatch, useSelector } from "react-redux";
import { updateTaskAsync } from "../reducers/taskReducer";

export default function UpdateTask({
  editTitle,
  setEditTitle,
  editDescription,
  setEditDescription,
  editExpiry,
  setEditExpiry,
  updateIndex,
  setUpdateIndex,
}) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  const saveUpdatedTask = () => {
    const updatedTask = {
      ...tasks.find((task) => task.id === updateIndex),
      title: editTitle,
      description: editDescription,
      expiry: editExpiry,
    };

    dispatch(updateTaskAsync(updatedTask))
      .then(() => {
        setUpdateIndex(-1);
        setEditTitle("");
        setEditDescription("");
        setEditExpiry("");
      })
      .catch((error) => {
        alert(`Failed to update task: ${error.message}`);
      });
  };

  return (
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
      <label className="expiry" htmlFor="expirytime">
        Expiry:
      </label>

      <input
        type="datetime-local"
        value={editExpiry}
        onChange={(e) => setEditExpiry(e.target.value)}
        id="expirytime"
        name="expirytime"
      />
      <div className="updateButtons">
        <button onClick={saveUpdatedTask}>Update Task</button>
        <button className="cancel" onClick={() => setUpdateIndex(-1)}>
          Cancel
        </button>
      </div>
    </div>
  );
}
