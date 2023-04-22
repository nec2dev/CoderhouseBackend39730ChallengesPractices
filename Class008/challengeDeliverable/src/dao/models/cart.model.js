const {Schema, model} = require('mongoose')

const cartCollection = 'products';
const cartSchema = new Schema({
    products:{
        type:Array
    },
    id:{
        type:Number,
        required:true
    }
})

module.exports = model(cartCollection, cartSchema)