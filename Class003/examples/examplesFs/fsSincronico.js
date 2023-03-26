const fs = require('fs');
//fs nos va a permitir trabajar con el sistema de archivos

fs.writeFileSync('hola.txt', 'Hola mundo'); //Escribimos en el archivo hola.txt el texto 'Hola mundo'

if(fs.existsSync('hola.txt')){ //Verificamos si el archivo hola.txt existe
    let contenido = fs.readFileSync('hola.txt', 'utf-8'); //Leemos el contenido del archivo hola.txt
    console.log(contenido); //Imprimimos el contenido del archivo hola.txt
    fs.appendFileSync('hola.txt', 'Hola mundo'); //Agregamos al archivo hola.txt el texto 'Hola mundo'
    contenido = fs.readFileSync('hola.txt', 'utf-8'); //Leemos el contenido del archivo hola.txt
    console.log(contenido); //Imprimimos el contenido del archivo hola.txt
    fs.unlinkSync('hola.txt'); //Eliminamos el archivo hola.txt
}