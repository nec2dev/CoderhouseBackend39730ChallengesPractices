/*Si la variable está definida exclusivamentedentro 
de la función, no será accesible desde fuera de la 
misma o desde otras funciones.*/

function exampleFunction() {
    // x solo se puede utilizar en exampleFunction
    const x = 'declarada en el scope local'
    console.log(x)
}
console.log(x) // ReferenceError: x is not defined