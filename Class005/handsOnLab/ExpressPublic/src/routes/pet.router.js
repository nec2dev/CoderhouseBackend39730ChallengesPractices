import express from "express";
import uploader from "../utils/multer.js";
import fs from "fs";
import { dirname } from "path";

const router = express.Router();
const leerAchivo = async () => {
    console.log('ruta: ',path.dirname(__dirname))
    await fs.promises.readdir(path.dirname(__dirname)+'/public/uploads')
    .then(resp => console.log(resp))
}

router.get('/', async (req, res)=>{
    await leerAchivo()
    return res.send({
        dato: req.dato1
    })
})
router.post('/', uploader.single('file') ,async (req, res)=>{    
    const { title, thumbnail } = req.body

    return res.json({
        title,
        dato1: req.dato1,
        dato2: req.dato2,
        thumbnail
    })
})

module.exports = router
