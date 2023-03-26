//ACTIVIDAD EN CLASE
//Lectura y escritura de archivos
/*
Escribir un programa ejecutable bajo node.js que realice las siguientes acciones:
    ✓ Abra una terminal en el directorio del archivo y ejecute la instrucción: npm init -y.
    Esto creará un archivo especial (lo veremos más adelante) de nombre package.json
    ✓ Lea el archivo package.json y declare un objeto con el siguiente formato y datos:
*/
/*
const info = {
    contenidoStr: (contenido del archivo leído en formato string),
    contenidoObj: (contenido del archivo leído en formato objeto),
    size: (tamaño en bytes del archivo)
}
*/
/*
    ✓ Muestre por consola el objeto info luego de leer el archivo
    ✓ Guardar el objeto info en un archivo llamado info.json dentro de la misma carpeta de package.json
    ✓ Incluir el manejo de errores (con throw new Error)
    ✓ Utilizar el módulo promises de fs dentro de una función async/await y utilizar JSON.stringify + 
    JSON.parse para poder hacer las transformaciones json->objeto y viceversa
*/

lecturayEscrituradeArchivos = async () => {
    let resultado = await fs.readFile('./package.json', 'utf-8')
    const info = JSON.parse(resultado) 
    console.log(info)
    await fs.writeFile('./info.json', JSON.stringify(info, null, 2), 'utf-8')
    console.log('Archivo creado')
}   

lecturayEscrituradeArchivos()   

// const fs = require('fs')
// const asyncOps = async _ => {
//     try {
//         if(!(fs.existsSync('./package.json'))) { 
//             throw new Error ('Does not exist package.json')
//         } else {
//             let result = await fs.promises.readFile('./package.json','utf-8')
//             const info = {
//                 contentStr: (result),
//                 contentObj: (JSON.parse(result)),
//                 size: (`${result.length} bytes`)
//             }
//             console.log(info)
//             await fs.promises.writeFile('./info.json',JSON.stringify(info,null,2))
//         }
//     } catch (error) {
//         console.error(`Got a error: ${error.message}`)        
//     }
// }
// asyncOps()






