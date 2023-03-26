const { UserManager } = require("./userManager");

const usuario = new UserManager()

usuario.crearUsuario({
    nombre: 'Fede',
    pass: '123456'
})

usuario.consultarUsuarios()
.then(resp => console.log('usuario',resp))
