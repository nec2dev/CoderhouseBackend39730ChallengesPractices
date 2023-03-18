const http = require('http');
const PORT = 8080;
//const PORT = 3000;
//const server = http.createServer((peticion, respuesta) => {});
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, this is my first server with node.js');
    //res.end('¡Mi primer hola mundo desde backend!');
});

server.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
