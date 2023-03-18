import express from 'express';

const app = express();
const port = 8080; // default port to listen
const usuarios = [
    {id:"1", nombre:"Juan", apellido:"Perez", edad: 33},
    {id:"2", nombre:"Ana", apellido:"Gomez", edad: 27},
    {id:"3", nombre:"Jose", apellido:"Gomez", edad: 55},
    {id:"4", nombre:"Maria", apellido:"Perez", edad: 44},
    {id:"5", nombre:"Luis", apellido:"Gomez", edad: 18},
    {id:"6", nombre:"Laura", apellido:"Perez", edad: 22},
    {id:"7", nombre:"Pedro", apellido:"Gomez", edad: 33},
    {id:"8", nombre:"Marta", apellido:"Perez", edad: 27}
];

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(usuarios);
});

app.get('/usuario/:id', (req, res) => {
    const id = req.params.id;
    const usuario = usuarios.find((user) => user.id === id);
    res.send(usuario);
}); 

app.get('/userId', (req, res) => {
    const { userId } = req.params;
    const usuario = usuarios.find((usuario) => usuario.id === userId);
    if(!usuario) return res.status(404).send("El usuario no existe");
    res.send(usuario);
});

app.listen(port, () => {
    console.log( `server started at http://localhost:${ port }` );
    console.log( `Listo para probar caso practico` );
});

