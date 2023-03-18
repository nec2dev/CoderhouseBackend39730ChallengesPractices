/*
Dados los siguientes objetos
**/
let objeto001 = {
    propiedad1: 1,
    propiedad2: "valor2",
    propiedad3: true
};

let objeto002 = {
    propiedad1: 'c',
    propiedad2: [1, 2, 3, 6, 7],
};

/*
SPREAD OPERATOR:
Permite combinar dos objetos en uno solo.
Nos sirve para hacer una desestructuración de un objeto,
para poder utilizar solo las propiedades que necesitemos.
**/
let {propiedad1, propiedad2} = objeto001;
/* 
Tomamos solo el objeto001 y desestructuramos las propiedades
lo rompemos para obtener solo las primeras dos propiedades
**/
let objeto003 = {...objeto001, ...objeto002};
/*
Spread Operator: tambien se puede utilizar para vaciar pro-\
piedades de un objeto en otro objeto nuevo.
**/
console.log(objeto003); // { propiedad1: 'c', propiedad2: [ 1, 2, 3, 6, 7 ], propiedad3: true }
/*
Notamos como, si dos elementos comparten el mismo nombre de propiedad, estos se sobreescriben,
se superponen, por lo que la propiedad propiedad1 del objeto003 es la propiedad1 del objeto002.
**/

/*
REST OPERATOR:
Permite combinar dos objetos en uno solo.
Nos sirve para hacer una desestructuración de un objeto,
para poder utilizar solo las propiedades que necesitemos.
**/

let objeto004 = {
    a: 1,
    b: 2,
    c: 3
};

let {a, ...resto} = objeto004;
/* Indicamos que queremos extraer la propiedad a y el resto de propiedades
que no sean a, las guardamos en una variable llamada resto.
**/
console.log(resto); // { b: 2, c: 3 }