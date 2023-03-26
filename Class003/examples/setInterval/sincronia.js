console.log("Iniciiando tarea!");
console.log("Realizando operacion");
for(let i = 1; i<=5; i++){
    console.log(i);
}
console.log("Tarea finalizada!");


//Orden de salida:
//Iniciiando tarea!
//Realizando operacion
//1
//2
//3
//4
//5
//Tarea finalizada!

//Como podemos ver, la operacion se realiza antes de la tarea finalizada, esto es debido a que la funcion temporizador se ejecuta de manera asincrona, es decir, se ejecuta en un hilo diferente al principal, por lo que la operacion se ejecuta en paralelo a la tarea finalizada, y cuando termina la operacion, se ejecuta el callback.