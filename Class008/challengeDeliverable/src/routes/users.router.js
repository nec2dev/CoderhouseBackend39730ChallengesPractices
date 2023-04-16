import { Router } from "express";
import Users from "../dao/managers/user.manager.js"

const router = Router();
const usersManager = new Users();

router.get('/' , async (req,res) => {
    let users = await usersManager.getAll();
    res.send({status:"success" , payload:users})
})

router.post('/' , async (req,res) => {
    const {first_name, last_name, email} = req.body;
    let newUser = {
        first_name,
        last_name,
        email
    };
    const result = await usersManager.saveUser(newUser);
    res.send({status:"success" , payload:result});
})

router.put('/:pid' , async (req,res) => {
    let id = req.params.pid;
    const {first_name, last_name, email} = req.body;
    let updateUser = {
        first_name,
        last_name,
        email
    };
    let result = await usersManager.updateUser(id, updateUser)
    res.send({status:"success" , payload:result})
})

router.delete('/:pid', async (req, res) => {
    let id = req.params.pid;
    let result = await usersManager.deleteUser(id);
    res.send({status:"success" , payload:result})
})

export default router;