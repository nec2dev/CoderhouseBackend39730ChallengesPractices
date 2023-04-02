import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewRouter from './routes/views.router.js';
import { Server } from 'socket.io';
import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';

const app = express(); 
const PORT = 8080;
const httpServer = app.listen(PORT, () => console.log("Server actvated on port: " + PORT));
const socketServer = new Server(httpServer); 

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.engine('handlebars', handlebars.engine()); 
app.set('views', __dirname + '/views'); 
app.set('view engine', 'handlebars'); 
app.use(express.static(__dirname + '/public')); 
app.use('/', viewRouter); 
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

socketServer.on('connection', socket => {
    console.log("We have a client connected");
    socket.on('message', data => {
        console.log(data);
    })
    socket.emit('updateProducts', "List of all products")
    socket.on('products', ()=>{
        console.log("The products arrived");
        socket.emit('productList', "All products ok");
    })
})