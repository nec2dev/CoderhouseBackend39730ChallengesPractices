import { Router } from "express"
import Messages from "../dao/managersmdb/message.manager.js"

const router = Router()
const messageManager = new Messages()
router.get('/messages' , async (req,res) => {
    let messages = await messageManager.getAll()
    res.send({status:"success" , payload:messages})
})

export default router