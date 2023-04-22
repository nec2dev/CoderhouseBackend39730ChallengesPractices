import express from 'express';
import __dirname from './utils.js';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import cartsRouter from './routes/carts.router.js';
import messagesRouter from './routes/messages.router.js';
import productsRouter from './routes/products.router.js';
import usersRouter from './routes/users.router.js';
import viewsRouter from './routes/views.router.js';
import Messages from "./dao/managers/message.manager.js";
import { Server } from "socket.io";

const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => console.log("Server activated on port: " + PORT))
const messagesManager = new Messages()
const io = new Server(server)
mongoose.connect('mongodb+srv://nahuelezequielcorrea:zzmXziFAu9UoBl5C@cluster0.lq5rpf5.mongodb.net/?retryWrites=true&w=majority', (error) => {
    if(error) {
        console.log("Cannot connect to database: " + error)
        process.exit()
    }
})

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use('/', viewsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/messages', messagesRouter)
app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)

io.on('connection', socket => {
    console.log("We have a client connected")
    socket.on('authenticated', data => {
        console.log(`username ${data} received`)
        socket.broadcast.emit('newUserConnected', data)
    })
    socket.on("message", async (data) => {
        console.log(data);
        await messagesManager.saveMessage({ user: data.user, message: data.message })
        const logs = await messagesManager.getAll()
        io.emit("log", { logs })
    })
})
