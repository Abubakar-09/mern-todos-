import express from "express";
import TasksRoutes from "./routes/tasks.js"
import cors from 'cors'

let app = express()
let port = 3000

app.use(cors(
    {
        origin: ['http://localhost:5173','hahah']
    }
))
app.use(express.json())
app.use("/", TasksRoutes)

app.listen(port, ()=>{
    console.log("runing of port 3000")
})