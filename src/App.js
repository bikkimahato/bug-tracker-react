import React, { useState } from "react";
import { v4 as uuid } from "uuid";

import "./App.css";
import BugListTable from "./BugListTable";

const App = () => {
  const [newBugDescription, setNewBugDescription] = useState("");
  const [newBugPriority, setNewBugPriority] = useState("");
  const [bugList, setBugList] = useState([]);

  const addBug = (event) => {
    event.preventDefault();
    const newBug = {
      id: uuid(),
      description: newBugDescription,
      priority: newBugPriority,
    };
    setBugList([...bugList, newBug]);
    setNewBugDescription("");
    setNewBugPriority("Medium");
  };

  const deleteBug = (id) => {
    const bugs = bugList.filter((bug) => bug.id !== id);
    setBugList(bugs);
  };

  return (
    <div className="app">
      <h1>🐞 Bug Tracker</h1>
      <BugListTable bugList={bugList} deleteBug={(id) => deleteBug(id)} />
      <form className="add-new-bug-form" onSubmit={addBug}>
        <label htmlFor="newBugDescription">New Bug Description:</label>
        <input
          type="text"
          data-testid="newbug-description"
          id="newBugDescription"
          value={newBugDescription}
          onChange={(event) => setNewBugDescription(event.target.value)}
        />
        <label htmlFor="newBugPriority">New Bug Priority: </label>
        <select
          onChange={(event) => setNewBugPriority(event.target.value)}
          value={newBugPriority}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button data-testid="add-bug" type="submit">
          Add New Bug
        </button>
      </form>
    </div>
  );
};

export default App;
