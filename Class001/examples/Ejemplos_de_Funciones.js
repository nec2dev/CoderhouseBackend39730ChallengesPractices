/* Funciones en JavaScript 8/
/* Funcion simple */
function nombreDeLaFuncion(parametros) {
    /* Cuerpo de la función, todas las instrucciones
    * internas que necesitamos qu la función
    * realice.
    * */
    let variableParaMiFuncion = 2;
    return variableParaMiFuncion;
    /* Con la palabra reservada return, podemos
    * retornar un valor, que será el resultado.
    * y mandar FUERA DEL SCOPE alguna variable
    * que necesitemos en otra parte del codigo.
    * */
}

//Ejemplo Completo
function sumarDosNumeros(num1, num2) {
    //resultado solo existe dentro de la función
    let resultado;
    resultado = num1 + num2;
    /*Cuando la funcion termine, la variable resultado
    * ya no existirá. Entonces hay que retornarla.
    * */
    return resultado;
}

//Mandamos a llamar la función con valores reales
let total = sumarDosNumeros(2, 3);
console.log(total); //5


/* Funcion Flecha */
/* Una funcion flecha es una funcion anonima,,
* quiere decir que no tiene nombre, pero puede
* ser asignada a una variable para poder iden-
* tificarse.
* */
const identificadorDeLaFuncion = (parametros) => {
    /* Cuerpo de la función, todas las instrucciones
    * internas que necesitamos qu la función
    * realice.
    * */
    let variableParaMiFuncion = 2;
    return variableParaMiFuncion;
    /* Con la palabra reservada return, podemos
    * retornar un valor, que será el resultado.
    * y mandar FUERA DEL SCOPE alguna variable
    * que necesitemos en otra parte del codigo.
    * La funcion flecha cuenta con un return implícito.
    * */
}

//Ejemplo Completo 
const sumarDosNumeros = (num1, num2) => {
    //resultado solo existe dentro de la función
    let resultado;
    resultado = num1 + num2;
    /*Cuando la funcion termine, la variable resultado
    * ya no existirá. Entonces hay que retornarla.
    * */
    return resultado;
}
const sumarReturnImplicito = (num1, num2) => num1 + num2;
