import { Tasks } from "../models/tasks.js";
import connectDB from "../config/conn.js"

// getting all the tasks 
export const getall = async (req, res) => {
    let data = await Tasks.find()
    res.status(200).json(data)
}

// posting a task 
export const postask = async (req, res) => {
    await connectDB();
    let body = req.body;
    let tasksToPost = await Tasks.create(body)
    await tasksToPost.save()
    res.json({"mess": "success"})
}

// deleting a task or all task at onces
export const deltasks = async (req, res) => {
    let body = req.params.id;
    if (body == 999) {
        await Tasks.deleteMany()
    } else {
        await Tasks.findOneAndDelete({ task: body })
    }
    res.json({"mess":"deleted"})
}

// updating a task 
export const updatask = async (req, res) => {
    await connectDB();
    let { _id } = req.body;
    let task = await Tasks.findById(_id);
    if (task) {
        task.status = !task.status;
        await task.save();
        res.json({"mess":"success"})
    } else {
        res.json({"mess":"error"})
    }
}