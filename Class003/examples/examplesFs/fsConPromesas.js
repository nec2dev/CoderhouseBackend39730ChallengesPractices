/*
Ejemplo de fs con promesas usando async/await
*/

const fs = require('fs').promises;
const operacionesAsincronas = async () => {
    await fs.promises.writeFile('hola.txt', 'Hola mundo');
    let contenido = await fs.promises.readFile('hola.txt', 'utf-8');
    console.log(contenido);
    await fs.promises.appendFile('hola.txt', 'Hola mundo');
    contenido = await fs.readFile('hola.txt', 'utf-8');
    console.log(contenido);
    await fs.promises.unlink('hola.txt');
}

operacionesAsincronas();