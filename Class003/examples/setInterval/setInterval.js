let contador = () => {
    let i = 1;
    console.log("Realizando operacion")
    let timer = setInterval(() => { 
        console.log(i++);
        if(i>5){
            clearInterval(timer);
        }
    }, 1000);
}
console.log("Iniciiando tarea!");
contador();
console.log("Tarea finalizada!");

//Orden de salida:
//Iniciiando tarea!
//Realizando operacion
//Tarea finalizada!
//1
//2
//3
//4
//5