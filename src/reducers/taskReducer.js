import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addTaskAsync = createAsyncThunk(
  "tasks/addTaskAsync",
  async (newTask, { dispatch }) => {
    const response = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(addTask(data));
    } else {
      throw new Error("Failed to add task");
    }
  }
);

export const updateTaskAsync = createAsyncThunk(
  "tasks/updateTaskAsync",
  async (updatedTask, { dispatch }) => {
    const response = await fetch(
      `http://localhost:5000/tasks/${updatedTask.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      }
    );
    if (response.ok) {
      const data = await response.json();
      dispatch(updateTask(data));
    } else {
      throw new Error("Failed to update task with id" + updatedTask.id);
    }
  }
);

export const completeTaskAsync = createAsyncThunk(
  "tasks/completeTaskAsync",
  async (taskId, { dispatch }) => {
    const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true }),
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(updateTask(data));
    } else {
      throw new Error("Failed to complete task with id" + taskId);
    }
  }
);

export const deleteTaskAsync = createAsyncThunk(
  "tasks/deleteTaskAsync",
  async (taskId, { dispatch }) => {
    const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      dispatch(deleteTask(taskId));
    } else {
      throw new Error("Failed to delete task with id " + taskId);
    }
  }
);

export const completeCheckedAsync = createAsyncThunk(
  "tasks/completeCheckedAsync",
  async (checkedIds, { dispatch }) => {
    await Promise.all(
      checkedIds.map(async (id) => {
        const response = await fetch(`http://localhost:5000/tasks/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ completed: true }),
        });
        if (!response.ok) {
          throw new Error("Failed to complete task with id " + id);
        }
      })
    );

    dispatch(completeChecked(checkedIds));
  }
);

export const deleteCheckedAsync = createAsyncThunk(
  "tasks/deleteCheckedAsync",
  async (checkedIds, { dispatch }) => {
    await Promise.all(
      checkedIds.map(async (id) => {
        const response = await fetch(`http://localhost:5000/tasks/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("Failed to delete task with id " + id);
        }
      })
    );

    dispatch(deleteChecked(checkedIds));
  }
);

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    completeChecked: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        action.payload.includes(task.id) ? { ...task, completed: true } : task
      );
    },
    deleteChecked: (state, action) => {
      state.tasks = state.tasks.filter(
        (task) => !action.payload.includes(task.id)
      );
    },
  },
});

export const {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  completeChecked,
  deleteChecked,
} = taskSlice.actions;

export default taskSlice.reducer;
