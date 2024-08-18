import React, { useState } from "react";
import Card from "./Card";
import DropIndicator from "./DropIndicator";
import AddCard from "./AddCard";

const Column = ({ title, headingColor, cards, column, setCards }) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.id);
    e.dataTransfer.setData("sourceColumn", column);
  };

  const handleDragEnd = async (e) => {
    const cardId = e.dataTransfer.getData("cardId");
    const sourceColumn = e.dataTransfer.getData("sourceColumn");

    if (sourceColumn !== column) return;

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      // Filter the cards to include only those from the sourceColumn
      let copy = cards.filter((c) => c.column === sourceColumn);
      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      let newPosition;
      if (moveToBack) {
        copy.push(cardToTransfer);
        newPosition = copy.length - 1;
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;
        copy.splice(insertAtIndex, 0, cardToTransfer);
        newPosition = insertAtIndex;
      }

      // Update positions for all cards in the column
      copy = copy.map((c, index) => ({ ...c, position: index }));

      // Make API calls to update the positions of all affected cards
      try {
        await Promise.all(
          copy.map((c) =>
            fetch(`http://localhost:3000/api/tasks/${c.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ...c, column, position: c.position }),
            })
          )
        );

        setCards(copy);
      } catch (error) {
        console.error("Error updating tasks:", error);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  // Filter and sort cards by position
  const filteredCards = cards
    .filter((c) => c.column === column)
    .sort((a, b) => a.position - b.position);

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => {
          return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
        })}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};

export default Column;