import express from 'express';

const route = express.Router();
route.get('/' , (req , res) => {
    res.render('index');
})
route.get('/realtimeproducts' , (req , res) => {
    res.render('realTimeProducts');
})

export default route;