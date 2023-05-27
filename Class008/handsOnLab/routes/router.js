const {Router} = require('express');
const router = Router();

app.use('api/usuarios', userRouter)
router.use('api/producto', productRouter)

module.exports = {router}