import React from "react";
import KanbanBoard from "./components/KanbanBoard";
// import { KanbanBoard } from "./components/CustomKanban";

const App = () => {
  return (
    <div className="flex justify-center bg-neutral-900">
      <div>
        <KanbanBoard />
      </div>
    </div>
  );
};

export default App;
