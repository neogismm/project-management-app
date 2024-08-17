import Task from "../models/Task.js";

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.json(tasks);
  } catch (err) {
    res
      .status(500)
      .json({
        error: "An error occurred while getting tasks",
        details: err.message,
      });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, column } = req.body;

    // Find the highest position in the specified column
    const highestPositionTask = await Task.findOne({ column })
      .sort({ position: -1 })
      .exec();

    // Determine the new task's position
    const position = highestPositionTask ? highestPositionTask.position + 1 : 0;

    // Create the new task with the determined position
    const newTask = await Task.create({ title, column, position });

    res.json(newTask);
  } catch (err) {
    res
      .status(500)
      .json({
        error: "An error occurred while creating task",
        details: err.message,
      });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, column } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, column },
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    res
      .status(500)
      .json({
        error: "An error occurred while updating task",
        details: err.message,
      });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    res
      .status(500)
      .json({
        error: "An error occurred while deleting task",
        details: err.message,
      });
  }
};

export { getTasks, createTask, deleteTask, updateTask };
