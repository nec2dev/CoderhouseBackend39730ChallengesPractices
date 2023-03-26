const temporizador = (callback) => {
    setTimeout(() => {
        callback('Hola mundo');
    }, 3000);
};

let operacion = () => console.log('Realizando operacion');
console.log('Iniciiando tarea!');
temporizador(operacion); //Metemos la funcion operacion como parametro de la funcion temporizador
console.log('Tarea finalizada!');

//Orden de salida:
//Iniciiando tarea!
//Tarea finalizada!
//Realizando operacion

//Como podemos ver, la operacion se realiza despues de la tarea finalizada, esto es debido a que la funcion temporizador se ejecuta de manera asincrona, es decir, se ejecuta en un hilo diferente al principal, por lo que la operacion se ejecuta en paralelo a la tarea finalizada, y cuando termina la operacion, se ejecuta el callback.
