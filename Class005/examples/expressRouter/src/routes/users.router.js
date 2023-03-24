import { Router } from 'express'
import { readFile } from 'fs/promises'
const users = await readFile('../data/users.json', 'utf-8')

const userRouter = Router()
userRouter.get('/', (req, res) => {
    res.send(users)
})

//GET http://localhost:8080/api/usuarios
userRouter.get('/', (req, res) => {
    return res.send(users)
})

//GET http://localhost:8080/api/usuarios/1
userRouter.get('/:id', (req, res) => {
    return res.send(users)
})

//POST http://localhost:8080/api/usuarios
userRouter.post('/', (req, res) => {
    const { name, email, age, gender } = req.body;
    return res.send(users)
})

export default userRouter
//module.exports = { userRouter }