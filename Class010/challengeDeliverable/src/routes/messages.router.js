import { Router } from "express"
import Messages from "../dao/managers/message.manager.js"

const router = Router()
const messageManager = new Messages()
router.get('/messages' , async (req,res) => {
    let messages = await messageManager.getMessages()
    res.send({status:"success" , payload:messages})
})

export default router