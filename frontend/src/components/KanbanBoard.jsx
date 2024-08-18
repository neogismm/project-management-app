import React from "react";
import Board from "./Board";

export const KanbanBoard = () => {
  return (
    <div className="h-screen w-full text-neutral-50">
      <Board />
    </div>
  );
};

export default KanbanBoard;