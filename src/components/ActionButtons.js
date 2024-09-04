// src/components/ActionButtons.js
import { useDispatch } from "react-redux";
import { completeTaskAsync, deleteTaskAsync } from "../reducers/taskReducer";

export default function ActionButtons({
  item,
  setUpdateIndex,
  setEditTitle,
  setEditDescription,
  setEditExpiry,
  formattedDate,
}) {
  const dispatch = useDispatch();

  const completeTask = (id) => {
    dispatch(completeTaskAsync(id));
  };

  const deleteTask = (id) => {
    dispatch(deleteTaskAsync(id));
  };

  const updateTaskIndex = (id) => {
    setUpdateIndex(id);
    const task = item;
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditExpiry(task.expiry);
  };

  return (
    <div className="buttons">
      {!item.completed && item.expiry > formattedDate && (
        <div>
          <button className="complete" onClick={() => completeTask(item.id)}>
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
          <button className="update" onClick={() => updateTaskIndex(item.id)}>
            <svg
              clipRule="evenodd"
              fillRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit="2"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="dodgerblue"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z"
                fillRule="nonzero"
              />
            </svg>
          </button>
        </div>
      )}
      <button className="delete" onClick={() => deleteTask(item.id)}>
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
  );
}
