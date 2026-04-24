import mongoose from "mongoose";

const { Schema } = mongoose;

const TasksSchema = new Schema({
  task: String,
  status: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type:Date
    ,
    default:Date.now}
});

export const Tasks = mongoose.model("Tasks", TasksSchema)