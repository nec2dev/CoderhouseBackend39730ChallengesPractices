//ACTIVIDAD EN CLASE
//Almacenar fecha y hora
/*
Realizar un programa que cree un archivo en el cual escriba la fecha y la hora actual. Posteriormente leer el archivo y mostrar el contenido por consola. 
Utilizar el módulo fs y sus operaciones de tipo callback.
*/

/*
const fecha = new Date().toLocaleDateString()

fs.writeFile('./fyh.txt', ``, 'utf-8', (err)=>{
    if (err) return console.log(err)        
    // acciones 
    console.log('Archivo creado') 
    fs.writeFile('fyh.txt', 'utf-8', (err,data)=>{
        if (err) return console.log(err)        
        console.log(data)
    })
*/

const fs = require('fs');
const moment = require('moment');

let fecha = moment().format('DD/MM/YYYY');
let hora = moment().format('HH:mm:ss');

fs.writeFile('fechaHora.txt', `Fecha: ${fecha} Hora: ${hora}`, (err) => {
    if(err) throw err;
    console.log('El archivo fue creado');
    fs.readFile('fechaHora.txt', 'utf-8', (err, data) => {
        if(err) throw err;
        console.log(data);
    });
}
);

