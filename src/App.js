import React from "react";
import TodoList from "./TodoList.js";
import { Provider } from "react-redux";
import store from "./store.js";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <TodoList />
      </Provider>
    </div>
  );
}
export default App;
