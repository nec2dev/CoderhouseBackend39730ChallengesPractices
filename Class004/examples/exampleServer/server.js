const express = require('express')

const app = express()
const PORT = 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const arrayUsuarios = [
    { id: '1', nombre: 'nombre 1', apellido: 'apellido 1', genero: 'F' },
    { id: '2', nombre: 'nombre 2', apellido: 'apellido 2', genero: 'F' },
    { id: '3', nombre: 'nombre 3', apellido: 'apellido 3', genero: 'M' },
    { id: '4', nombre: 'nombre 4', apellido: 'apellido 4', genero: 'F' },
    { id: '5', nombre: 'nombre 5', apellido: 'apellido 5', genero: 'M' },
    { id: '6', nombre: 'nombre 6', apellido: 'apellido 6', genero: 'M' },
    { id: '7', nombre: 'nombre 7', apellido: 'apellido 7', genero: 'F' },
    { id: '8', nombre: 'nombre 8', apellido: 'apellido 8', genero: 'M' }
]

app.get('/api/usuarios', (req, res)=>{  
    res.send(arrayUsuarios)
})

app.get('/api/usuarios/:uid', (req, res)=>{  
    const { userId } = req.params

    const usuario = arrayUsuarios.find((usuario) => usuario.id === userId)

    if (!usuario) return res.status(400).send('no se encontro el usuario') 

    res.status(200).send(usuario)
})

// rutas
app.post('/api/usuarios', (req, res) => {
    const { nombre, apellido } = req.body
    console.log(nombre)
    console.log(req.body)
    if (!nombre || !apellido) {
        return res.status(400).send('Faltan datos')
    }

    arrayUsuarios.push({nombre, apellido})

    res.status(200).json({
        status: 'success',
        payload: arrayUsuarios
    })
})

// put 

app.put('/api/usuarios/:uid', (req, res) => {

    const { uid } = req.params
    const { nombre, apellido } = req.body
    
    // validar el id
    if (!uid) {
        return res.status(400).send('manda el id')
    }

    if (!nombre || !apellido) {
        return res.status(400).send('Faltan datos')
    }

    const usuarioIndex = arrayUsuarios.findIndex((usuario) => usuario.id === uid)
    // validar si existe el index
    if (usuarioIndex === -1) return res.status(400).send('no se encontro el usuario')

    arrayUsuarios[usuarioIndex] = { id: uid, nombre, apellido }


    res.status(200).json({
        status: 'success',
        payload: arrayUsuarios
    })
})
// delete
app.delete('/api/usuarios/:uid', async (req, res) => {
    
        const { uid } = req.params
    
        // validar el id
        if (!uid) {
            return res.status(400).send('manda el id')
        }
    
        const usuarioIndex = arrayUsuarios.findIndex((usuario) => usuario.id === uid)
        // validar si existe el index
        if (usuarioIndex === -1) return res.status(400).send('no se encontro el usuario')
    
        arrayUsuarios.splice(usuarioIndex, 1)
    
        res.status(200).json({
            status: 'success',
            payload: arrayUsuarios
        })
})


// productos
// mensajes
// CArrito de compras


app.listen(PORT, (err) => {
    if (err) return console.log('Error al iniciar el servidor')

    console.log(`Servidor iniciado en el puerto ${PORT}`)
})