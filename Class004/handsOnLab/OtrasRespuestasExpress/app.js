/*
Otras respuestas con express
Crear un proyecto basado en express js, el cual cuente con un servidor que escuche en el puerto 8080. 
Además de configurar los siguientes endpoints:
    ✓ El endpoint del método GET a la ruta ‘/bienvenida’ deberá devolver un html con letras en color 
    azul, en una string, dando la bienvenida.
    ✓ El endpoint del método GET a la ruta ‘/usuario’ deberá devolver un objeto con los datos de un 
    usuario falso: {nombre, apellido,edad, correo}
**/

import express from 'express';
const app = express();
app.get('/bienvenida', (req, res) => {
    res.send("<h1 style='color:blue'>¡Bienvenido!</h1>");
})
app.get('/usuario', (req, res) => {
    res.send({nombre:"Juan", apellido:"Perez", edad:25, correo:"juancitoperez@gmail.com"});
})
const port = 8080;
app.listen(port, () => console.log("Puerto 8080 activado"))
