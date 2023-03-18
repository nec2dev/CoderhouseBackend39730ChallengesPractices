/*
Exponential: Permite hacer el equivalente a 
Math.pow(base, exponent) pero con un exponente negativo.
**/
let valoresBase = [2, 3, 4, 5, 6, 7, 8, 9, 10];
let nuevosValores = valoresBase.map((numero, indice) => numero ** indice);
console.log(nuevosValores); // [1, 3, 16, 125, 1296, 16807, 262144, 4782969, 100000000]

