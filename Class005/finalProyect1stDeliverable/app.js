import express from 'express';
import productRouter from './src/routes/products.router.js';
import cartRouter from './src/routes/carts.router.js';

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

const server = app.listen(PORT, () => console.log("Server up on port: " + PORT));


