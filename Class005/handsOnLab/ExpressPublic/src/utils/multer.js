const multer = require('multer')
const path = require('path')
console.log(path.dirname(__dirname))

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        if(!file) return cb(new Error('No hay archivo'))
        cb(null, path.dirname(__dirname)+'/public/uploads')
    },
    filename: function(req, file, cb){
        if(!file) return cb(new Error('No hay archivo'))
        cb(null, file.originalname)
    },
})

const uploader = multer({storage})

module.exports = {
    uploader
}