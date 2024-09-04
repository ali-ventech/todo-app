import { useState } from "react";
import { useDispatch } from "react-redux";
import { setTasks } from "../reducers/taskReducer";

export default function SortBy({ tasks, originalTasks }) {
  const [sortOption, setSortOption] = useState("time");
  const dispatch = useDispatch();
  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);

    let sortedTasks = [...tasks];

    if (option === "title") {
      sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (option === "completed") {
      sortedTasks.sort((a, b) => a.completed - b.completed);
    } else if (option === "created") {
      sortedTasks.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    } else if (option === "expiry") {
      sortedTasks.sort((a, b) => a.expiry.localeCompare(b.expiry));
    } else {
      sortedTasks = [...originalTasks];
    }
    dispatch(setTasks(sortedTasks));
  };
  return (
    <div className="sortBy">
      <label htmlFor="sort">Sort By: </label>
      <select id="sort" value={sortOption} onChange={handleSortChange}>
        <option value="time" selected hidden>
          Default
        </option>
        <option value="title">Title</option>
        {/* <option value="completed">Completed</option> */}
        <option value="created">Created Date</option>
        <option value="expiry">Expiry Date</option>
      </select>
    </div>
  );
}
