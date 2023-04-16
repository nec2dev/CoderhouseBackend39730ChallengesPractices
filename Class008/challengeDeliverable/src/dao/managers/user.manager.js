import usersModel from '../models/users.model.js';

export default class Users {
    constructor() {
        console.log("Working in mongoDB with Users");
    }

    getAll = async () => {
        let users = await usersModel.find().lean();
        return users;
    }

    saveUser = async (user) => {
        let result = await usersModel.create(user);
        return result;
    }

    updateUser = async (id,update) => {
        let result = await usersModel.findByIdAndUpdate(id,update)
        return result;
    }

    deleteUser = async (id) => {
        let result = await usersModel.findByIdAndDelete(id)
        return result;
    }
}