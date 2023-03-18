import express from 'express';
const app = express();
/*
Utilizamos los dos puntos para indicar que el parametro es dinamico
*/

app.get('/unparametro/:nombre', (req, res) => {
    //:parametro ahora se encontrara dentro del objeto req.params
    console.log(req.params.nombre);
    res.send(`¡Bienvenid@, ${req.params.nombre}!`);
})
app.get('/dosparametros/:nombre/:apellido', (req, res) => {
    //:parametro ahora se encontrara dentro del objeto req.params
    res.send(`¡Bienvenid@, el nombre completo es: ${req.params.nombre}, ${req.params.apellido}`);
})
const port = 8080;
app.listen(port, () => console.log("Puerto 8080 activado"))