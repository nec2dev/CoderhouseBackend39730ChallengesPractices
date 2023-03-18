/*El siguiente código es válido debido a que la 
variable se declara fuera de la función, lo que 
la hace global.*/

const x = 'declarada en el scope global'
function example() {
    console.log(x) // x existe acá adentro
}
example() // esto no lanza error
console.log(x) // x existe acá afuera también