import { useDispatch, useSelector } from "react-redux";
import {
  completeCheckedAsync,
  deleteCheckedAsync,
} from "../reducers/taskReducer";

export default function CheckedActions({
  checked,
  setChecked,
  showChecks,
  setShowChecks,
  formattedDate,
}) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  const toggleChecks = () => {
    setShowChecks(!showChecks);
  };

  const deleteChecked = () => {
    dispatch(deleteCheckedAsync(checked))
      .then(() => {
        setChecked([]);
        toggleChecks();
      })
      .catch((error) => {
        alert(`Failed to delete checked tasks: ${error.message}`);
      });
  };

  const completeChecked = () => {
    dispatch(completeCheckedAsync(checked))
      .then(() => {
        setChecked([]);
        toggleChecks();
      })
      .catch((error) => {
        alert(`Failed to complete checked tasks: ${error.message}`);
      });
  };

  const includesCompleted = () => {
    return tasks.some((task) => checked.includes(task.id) && task.completed);
  };

  return (
    <div className="showChecks">
      {checked.length === 0 ? (
        <button onClick={toggleChecks}>Select</button>
      ) : (
        <>
          <button className="deleteBtn" onClick={deleteChecked}>
            Delete
          </button>
          <button onClick={completeChecked} disabled={includesCompleted()}>
            Complete
          </button>
        </>
      )}
    </div>
  );
}
