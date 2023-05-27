const { Router } = require('express')
const { UserManagerMongo } = require('../managersDao/uesrManagerMongo')
// import { Router } from 'express'

const router = Router()
const usersManager = new UserManagerMongo()


// get http://localhost:8080/api/usuarios /
router.get('/', async (request, response) =>{
    try {
        const users = await usersManager.getUsers()
        if (!users) {
            return response.status(400).send('No hay usuarios')            
        }
        response.status(200).send(users)
    } catch (error) {
        console.log(error)
    }
})

// get http://localhost:8080/api/usuarios /id
router.get('/:id', (request, response) =>{
    const {id} = request.params
    response.status(200).send(id)
})



// POST http://localhost:8080/api/usuarios /
router.post('/', async (request, response) =>{
    try {
        //mada el  cliente request 
        let {first_name, last_name} = request.body
        if (!first_name || !last_name) {
            return response.status(400).send({ message: 'Che pasar todos los datos'})
        }
        // console.log('user post',user)
        let userAgregado = await usersManager.addUser({last_name, first_name, email})
        // console.log(userAgregado)

        response.status(201).send({ 
            userAgregado,
            message: 'usuario creado' 
        })
        
    } catch (error) {
        console.log(error)
    }
})

// PUT http://localhost:8080/api/usuarios /:userId
router.put('/:uid', async (request, response) =>{

    const { uid } = request.params
    

    //mada el  cliente request 
    let userToReplace = request.body
    if (!userToReplace.first_name || !userToReplace.last_name || !userToReplace.email) {
        return response.status(400).send({ message: 'Che pasar todos los datos'})
    }
    let result = await usersManager.updateUser(uid, userToReplace)
    response.status(201).send({ 
        users: result,
        message: 'usuario Modificado' 
    })
})

// DELETE http://localhost:8080/api/usuarios /:userId
router.delete('/:uid', async (req, res)=> {
    const { uid } = req.params

    let result = await usersManager.deletUser(uid)
    
    res.status(200).send({ message:"Usuario borrado", result })
})

module.exports = router
// export default router



