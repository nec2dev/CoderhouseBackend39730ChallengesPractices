const fs = require('fs')
const crypto = require('crypto')
const path = './files/Usuarios.json'

class UserManager {
    constructor(ruta) {
        this.ruta = path
    }
    consultarUsuarios = async ()=>{ 
        try {
            if (fs.existsSync(this.ruta)) {
                const users = await fs.promises.readFile(this.ruta, 'utf-8')
                return JSON.parse(users)
            }
            return []
        } catch (error) {
            return []
        }      
    }
    crearUsuario = async (newUser) => {
        const users =  await this.consultarUsuarios()

        if(users.length===0){
            newUser.id=1;
        }else{
            newUser.id = users[users.length-1].id+1
        }
        newUser.salt = crypto.randomBytes(128).toString('base64') // palabra secreta p/ firma
        newUser.password = crypto.createHmac('sha256', newUser.salt).update(newUser.pass).digest('hex') 
        console.log(newUser)
        // users.push(newUser)
        // await fs.promises.writeFile(path,JSON.stringify(users,null,'\t'));
        return newUser;
    }

}
// validar
module.exports = {
    UserManager
}
