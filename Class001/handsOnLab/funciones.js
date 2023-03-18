/*claserealizar una función que corrobore elementos en una lista.*/
/* ¿Cómo lo hacemos?
* Definiremos la función “mostrarLista”, la cual recibirá un 
* arreglo con elementos como parámetro.
* ✓ Si la lista está vacía, devolver un mensaje indicando “Lista vacía”.
* ✓ Si la lista cuenta con elementos, mostrarlos 1 por 1 en consola. Finalizar el proceso indicando la longitud de la lista (Utilizar template strings)
* ✓ Invocar la función con los casos de prueba.
* */

/*const listaVacia = []
const listaConElementos = [1, 2, 3, 4, 5]

function mostrarLista(lista) {
    if (lista.length === 0) {
        console.log('Lista vacía')
    } else {
        for (let i = 0; i < lista.length; i++) {
            console.log(`Elemento ${i}: ${lista[i]}`)
        }
        console.log(`La lista tiene ${lista.length} elementos`)
    }
}

mostrarLista(listaVacia)
mostrarLista(listaConElementos)*/

const mostrarLista = (arrayLista=[]) => {
    if(arrayLista.length === 0) return 'lista vacía'
    arrayLista.forEach(item => console.log(item))
    return `El tamaño de la lista es ${arrayLista.length}`
} 

console.log(mostrarLista(['Nahuel', 'Mayra']))



