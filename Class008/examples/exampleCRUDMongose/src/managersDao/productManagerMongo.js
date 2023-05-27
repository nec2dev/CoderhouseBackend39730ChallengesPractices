const { userModel } = require("../models/users.model")

class UserManagerMongo{
    getUsers = async () =>  await userModel.find()
    getProductById = (id) => {}
    addProduct = (newItem) => {}    
}

module.exports = { UserManagerMongo }

