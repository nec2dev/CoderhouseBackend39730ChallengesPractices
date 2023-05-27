const { userModel } = require("../models/users.model")

class UserManagerMongo{
    getProductById = (id) => {}
    
    addUser = async (newItem) => {
        return await userModel.create(newItem) 
    }

    updateUser = async (uid, userToReplace) => {
        return await userModel.updateOne({_id: uid}, userToReplace)
    }

    deletUser = async (uid) => {
        // return await userModel.updateOne({_id: uid}, {status: false})
        return await userModel.deleteOne({_id: uid})
    }   
}

module.exports = { UserManagerMongo }
