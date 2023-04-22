const userModel = require('../models/user.model.js') 

class UserManagerMDB {
    // constructor() {
    //     console.log("Working in mongoDB with Users")
    // }

    getAll = async () => {
        let users = await userModel.find().lean()
        return users;
    }

    saveUser = async (user) => {
        let result = await userModel.create(user)
        return result;
    }

    updateUser = async (id, update) => {
        let result = await userModel.findByIdAndUpdate(id,update)
        return result
    }

    deleteUser = async (id) => {
        let result = await userModel.findByIdAndDelete(id)
        return result
    }
}

module.exports = new UserManagerMDB()