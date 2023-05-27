const { connect } = require("mongoose")
require('dotenv').config()
let url = `mongodb+srv://federico:federico1@coderexample.hjzrdtr.mongodb.net/comision39730?retryWrites=true&w=majority`
const objConfig = {
    connectDB: async () =>{
        try {
            await connect(url)
            console.log('Base de datos conectada')
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = { objConfig }