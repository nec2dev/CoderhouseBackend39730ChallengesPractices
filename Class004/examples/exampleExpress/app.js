//primer paso: npm init -y
//segundo paso: npm install express
//tercer paso: npm install nodemon -D

/*
Ejemplo de una consulta en Express
✓ Estructurar un servidor basado en express, el cual escuche peticiones 
en el puerto 8080
✓ Realizar una función para el método GET en la ruta ‘/saludo’, el cual 
responderá con “¡Hola a todos, pero ahora desde express!”
✓ Ejecutar con nodemon y probar en el navegador el endpoint generado
**/

//const express = require('express');
import express from 'express';
const app = express();
app.get('/saludo', (req, res) => {
    res.send("¡Hola a todos, pero ahora desde express!");
})
const port = 8080;
app.listen(port, () => console.log("Puerto 8080 activado"))

