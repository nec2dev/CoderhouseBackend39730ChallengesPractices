import UserManagerMDB from '../dao/managers/user.manager.js'

const { Router } = require('express')
const router = Router()
const userManager = new UserManagerMDB()

router.get('/', async (request, response) =>{
    try {
        const users = await userManager.getUsers()
        if (!users) {
            return response.status(400).send('No hay usuarios')            
        }
        response.status(200).send(users)
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', (request, response) =>{
    const {id} = request.params
    response.status(200).send(id)
})

router.post('/', async (request, response) =>{
    try {
        let {first_name, last_name} = request.body
        if (!first_name || !last_name) {
            return response.status(400).send({ message: 'Che pasar todos los datos'})
        }
        let userAgregado = await userManager.addUser({last_name, first_name, email})
        response.status(201).send({ 
            userAgregado,
            message: 'usuario creado' 
        })
    } catch (error) {
        console.log(error)
    }
})

router.put('/:uid', async (request, response) =>{
    const { uid } = request.params
    let userToReplace = request.body
    if (!userToReplace.first_name || !userToReplace.last_name || !userToReplace.email) {
        return response.status(400).send({ message: 'Che pasar todos los datos'})
    }
    let result = await userManager.updateUser(uid, userToReplace)
    response.status(201).send({ 
        users: result,
        message: 'usuario Modificado' 
    })
})

router.delete('/:uid', async (req, res)=> {
    const { uid } = req.params
    let result = await userManager.deletUser(uid)
    res.status(200).send({ message:"Usuario borrado", result })
})

module.exports = router