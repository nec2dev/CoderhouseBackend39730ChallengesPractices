import { Router } from "express"
import MessageManager from "../dao/managers/message.manager.js"

const router = Router()
const messageManager = new MessageManager()
router.get('/messages' , async (req,res) => {
    let messages = await messageManager.getMessages()
    res.send({status:"success" , payload:messages})
})

export default router