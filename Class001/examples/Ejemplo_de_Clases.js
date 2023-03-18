/* Comenzamos utilizando la palabra reservada class para definir 
una clase. */
class nombreDeLaClase {
    /* Dentro de la clase, podemos definir propiedades y métodos. */
    /* Una clase cuenta con un metodo(funcion) constructor, el cual
    se ejecuta cuando se instancia la clase. */
    constructor(parametrosDeCreacion) {
        console.log('Se ha creado una instancia de la clase')
        /* Dentro del constructor, podemos definir las propiedades
        de la clase, utilizando la palabra reservada this. */
        this.propiedad = parametrosDeCreacion
        this.variableInterna = 'valor'
        /* Cada instancia de la clase, tendrá una copia de las
        propiedades definidas en el constructor. 
        Tambien contara con variables internas, para poder decla-
        rarlas y utilizarlas  necesitamos declarar un this antes
        de la variable*/
    }

    static variableEstatica = 4;
    /* Las variables estaticas son variables que pertenecen a la
    clase, no a las instancias. 
    La palabra static es una variable que puede utilizarse SIN NE-
    CESIDAD DE UNA INSTANCIA, ademas, todas sus instancias pueden
    acceder a ella de igual manera. SI ALGUNA INSTANCIA CAMBIA LA
    VARIABLE ESTATICA, todas las instancias se enteraran*/

    metodo01() {
        /* Los metodos son funciones que se encuentran dentro de una
        clase. */
        console.log('Soy un metodo de la clase')
    }

    metodo02 = () => {
        console.log(`Soy una funcion flecha, puedo incrustar variables:  
        ${this.variableInterna}, todo dentro de una clase, una locura!`)
    }
}

/* Una vez definida la clase, podemos instanciarla, utilizando la
palabra reservada new. */
const instanciaDeLaClase = new nombreDeLaClase('parametroDeCreacion')

/* Nota como ahora la instancia cuanta con las variables y metodos
definidos en la clase. */
console.log(instanciaDeLaClase.propiedad)
instanciaDeLaClase.metodo01()
instanciaDeLaClase.metodo02()

/* Para usar una variable estatica, no es necesario instanciar la
clase, podemos acceder a ella directamente. */
console.log(nombreDeLaClase.variableEstatica)

/* La magia esta en que podemos crear tantas instancias como
queramos, y cada una de ellas tendrá sus propias variables y
metodos. */
const otraInstanciaDeLaClase01 = new nombreDeLaClase('otroParametro')
console.log(otraInstanciaDeLaClase01.propiedad)
const otraInstanciaDeLaClase02 = new nombreDeLaClase('otroParametroMas')
console.log(otraInstanciaDeLaClase02.propiedad)
const otraInstanciaDeLaClase03 = new nombreDeLaClase('otroParametroMasMas')
console.log(otraInstanciaDeLaClase03.propiedad)