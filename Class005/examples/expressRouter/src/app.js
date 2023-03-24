const express = require('express')
const userRouter = require('./routes/users.router')
const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/usuarios', userRouter)
app.use('/api/productos')
app.listen(PORT, () => {
    if(err) return console.log(`Error: ${err}`)
    console.log(`Server running on port ${PORT}`)
}
)




