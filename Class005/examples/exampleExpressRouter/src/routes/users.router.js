//import { readFile } from 'fs/promises'

const express = require('express')
const Router = express.Router
const users = require('../data/users.json', 'utf-8')
const userRouter = Router()


//GET http://localhost:8080/api/usuarios
userRouter.get('/', (req, res) => {
    return res.send(users)
})

//GET http://localhost:8080/api/usuarios/id
userRouter.get('/:id', (req, res) => {
    return res.send(users[req.params.id])
})

//POST http://localhost:8080/api/usuarios
userRouter.post('/', (req, res) => {
    const { name, lastname, mail, age, id } = req.body;
    return res.send(users)
})

//PUT http://localhost:8080/api/usuarios/1
userRouter.put('/:id', (req, res) => {
    const { name, lastname, mail, age, id } = req.body;
    return res.send(users)
})

//DELETE http://localhost:8080/api/usuarios/1
userRouter.delete('/:id', (req, res) => {
    return res.send(users)
})


module.exports = userRouter
