import express from "express";
import { deltasks, getall, postask, updatask } from "../controllers/controller.task.js";

let router = express.Router()

router.get('/',  getall)
router.post('/',  postask)
router.delete('/:id',  deltasks)
router.put('/',  updatask)

export default router;