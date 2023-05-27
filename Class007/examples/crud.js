// 1. Tener listo nuestro proyecto con express
// Contaremos con su proyecto dentro de la carpeta src,
// siguiendo la estructura que hemos estructurado.
// Además, con un router de users para poder ejemplificar
// un CRUD con Mongoose.
// Por último, contaremos con una nueva carpeta llamada
// “models” donde guardaremos cada modelo (esquema) que
// queramos modelar de la base de datos.

// 2. Instalación de Mongoose
// Para poder utilizar mongoose, bastará con utilizar el \
// comando npm install mongoose
// Recuerda que para este punto ya debiste haber hecho
// npm install express y debiste hacer el router comentado
// en el paso 1. Esto debido a que necesitaremos especificar
// exactamente dónde queremos utilizar mongoose.

// 3. Archivo user.model.js
// En nuestra carpeta “models” crearemos nuestro primer
// modelo user. Utilizaremos mongoose para definir el
// esquema de nuestra base de datos.
// Un esquema debe contener las propiedades y tipos de
// datos que aparecerán en la base de datos.
// Antes de hacer un esquema, debemos tener bien definido
// qué propiedades deberá tener para poder trabajar con él.

// 4. Ahora podemos importar nuestro “userModel” y
// utilizarlo en el router de usuarios

// Solo falta un detalle:
// Conectar Mongoose a nuestra base de Atlas
// Volviendo a nuestra cuenta de Atlas, notaremos que hay
// un botón de “Connect”.
// Nos da diferentes formas de conexión. Utilizaremos el
// “Connect your application”
// Recibiremos una liga para poder conectarnos, la utilizaremos
// en nuestra aplicación de nodejs
