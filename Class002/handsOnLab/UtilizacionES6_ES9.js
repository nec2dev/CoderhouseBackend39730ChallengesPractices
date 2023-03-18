/*
Descripción de la actividad.
Dados los objetos indicados en la siguiente diapositiva:
**/
const objetos = [
    {
        manzanas: 3,
        peras: 2,
        carne: 1,
        jugos: 5,
        dulces: 2
    },
    {
        manzanas: 1,
        sandias: 1,
        huevos: 6,
        jugos: 1,
        panes: 4
    }
]

/*
✓ Realizar una lista nueva (array) que contenga todos los tipos de productos 
(no cantidades), consejo: utilizar Object.keysy Array.includes. 
Mostrar el array por consola.
**/
let nuevoArray = [];
for (let i = 0; i < objetos.length; i++) {
    let objeto = objetos[i];
    let keys = Object.keys(objeto);
    for (let j = 0; j < keys.length; j++) {
        let key = keys[j];
        if (!nuevoArray.includes(key)) {
            nuevoArray.push(key);
        }
    }
}
console.log(nuevoArray); // [ 'manzanas', 'peras', 'carne', 'jugos', 'dulces', 'sandias', 'huevos', 'panes' ]
/*
✓ Posteriormente, obtener el total de productos vendidos por todos los objetos 
(utilizar Object.values)
**/
let totalProductos = 0;
for (let i = 0; i < objetos.length; i++) {
    let objeto = objetos[i];
    let values = Object.values(objeto);
    for (let j = 0; j < values.length; j++) {
        let value = values[j];
        totalProductos += value;
    }
}
console.log(totalProductos); // 21


