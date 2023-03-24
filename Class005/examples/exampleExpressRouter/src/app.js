const express = require('express')
const app = express()
const PORT = 8080
const usersRouter = require('./routes/users.router')
//const productsRouter = require('./routes/products.router')

//app.use(express.json())
//app.use(express.urlencoded({ extended: true }))
app.use('/api/usuarios', usersRouter)
//app.use('/api/productos', productsRouter)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})




