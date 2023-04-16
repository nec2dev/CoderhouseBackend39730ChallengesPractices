import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import mongoose from "mongoose";
import cartRouter from './routes/carts.router.js';
import messageRouter from './routes/messages.router.js';
import productRouter from './routes/products.router.js';
import userRouter from './routes/users.router.js';
import viewRouter from './routes/views.router.js';
import Messages from "./dao/managers/message.manager.js";

const app = express(); 
const PORT = 8080;
const server = app.listen(PORT, () => console.log("Server actvated on port: " + PORT));
const io = new Server(server) 
const messagesManager = new Messages()

app.use(express.json());
app.use(express.urlencoded({ extended: true })) 
app.engine('handlebars', handlebars.engine()) 
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))
app.use('/', viewRouter)
app.use('/api/carts', cartRouter)
app.use('/api/messages', messageRouter)
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)

io.on('connection', socket => {
    console.log("We have a client connected");
    socket.on('authenticated', data => {
        console.log(`username ${data} received`);
        socket.broadcast.emit('newUserConnected', data);
    })
    socket.on("message", async (data) => {
        console.log(data);
        await messagesManager.saveMessage({ user: data.user, message: data.message })
        const logs = await messagesManager.getAll();
        io.emit("log", { logs });
    })
})