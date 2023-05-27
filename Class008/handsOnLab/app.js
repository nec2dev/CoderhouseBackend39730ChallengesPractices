const express = require('express');
const app = express();
const PORT = 8080;
const router = require('./routes/router.js');
app.listen(PORT, () => {
    if(err){
        console.log(err)
    }
    console.log(`Servidor express escuchando en http://localhost:${PORT}`)
});
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(router)