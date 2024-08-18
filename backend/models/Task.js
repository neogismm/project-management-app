import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  column: {
    type: String,
    required: true,
    enum: ['backlog', 'todo', 'doing', 'done']
  },
  position: {type: Number, required: true},
});

export default mongoose.model("Task", taskSchema);
