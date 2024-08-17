import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  column: { type: String, required: true }, // backlog, todo, doing, done
});

export default mongoose.model("Task", taskSchema);
