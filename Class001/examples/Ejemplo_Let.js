//Aquí la variable i es global y la variablejes local.
let i = 0;
function foo01() {
    i = 1;
    let j = 2;
    if (true) {
        console.log(i); //1
        console.log(j); //2
    }
}
foo01();

/*Pero si declaramos una variable con letdentro un bloque, 
que a su vez está dentro de una función, la variable pertenece 
solo a ese bloque.*/
function foo02() {
    let i = 0;
    if (true) {
        /* Seria otra variable i,
        solo para este bloque if */
        let i = 1;
        console.log(i); //1
    }
    console.log(i); //0
}
foo02();

/*Fuera del bloque donde se declara con let, la variable
no está definida.*/
function foo03() {
    if (true) {
        let i = 1;
    }
    //console.log(i); //Error
    //ReferenceError: i is not defined
    console.log(i); 
}
foo03();