const { connect } = require('mongoose')
require('dotenv').config()
let url = `mongodb+srv://nahuelezequielcorrea:zzmXziFAu9UoBl5C@cluster0.lq5rpf5.mongodb.net/?retryWrites=true&w=majority`
const objConfig = {
    connectDB: async () =>{
        try {
            await connect(url)
            console.log('Database coennected')
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = { objConfig }
