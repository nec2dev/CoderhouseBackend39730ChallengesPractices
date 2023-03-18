class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }
    static especie = 'Humano';
    saludar = () => {
        console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años`);
    }
    getEspecie = () => {
        console.log(`La especie es ${Persona.especie}`);
    }
}

let persona1 = new Persona('Juan', 25);
let persona2 = new Persona('Pedro', 30);
persona1.saludar();
persona2.saludar();
persona1.getEspecie();
persona2.getEspecie();

console.log(Date.now())