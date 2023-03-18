/* Creación de una clase contador */
/* ¿Cómo lo hacemos? 
* Se creará una clase que permitirá llevar cuentas individuales 
* según cada responsable.
*   ✓ Definir clase Contador
*   ✓ La clase se creará con un nombre, representando al responsable del contador.
*   ✓ El contador debe inicializarse en 0
*   ✓ Debe existir una variable estática que funcione como contador global de todas las instancias de contador creadas.
*   ✓ Definir el método getResponsable, el cual debe devolver el responsable de dicho contador.
*   ✓ Definir el método contar, el cual debe incrementar, tanto su cuenta individual, como la cuenta global.
*   ✓ Definir el método getCuentaIndividual, el cual debe devolver sólo la cuenta individual del contador
*   ✓ Definir el método getCuentaGlobal, el cual debe devolver la variable estática con el conteo global.
*   ✓ Realizar prueba de individualidad entre las instancias.
* */

class Contador {
    constructor(responsable) {
        this.responsable = responsable;
        this.contador = 0;
    }
    static contadorGlobal = 0;
    getResponsable = () => this.responsable;
    contar = () => {
        this.contador++;
        Contador.contadorGlobal++;
    }
    getCuentaIndividual = () => this.contador;
    getCuentaGlobal = () => Contador.contadorGlobal;
}

let contador01 = new Contador('Nahuel')
let contador02 = new Contador('Mayra')

contador01.contar()
contador01.contar()
contador01.contar()
contador01.contar()
contador01.contar()

console.log(contador01.getResponsable())
console.log(contador01.getCuentaIndividual())
console.log(contador01.getCuentaGlobal())

contador02.contar()
contador02.contar()
contador02.contar()

console.log(contador02.getResponsable())
console.log(contador02.getCuentaIndividual())
console.log(contador02.getCuentaGlobal())
