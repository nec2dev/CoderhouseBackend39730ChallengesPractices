import userModel from "../../models/user.model.js";

export default class User {
  constructor() {
    console.log("Working in mongoDB with Users");
  }

  createUser = async (user) => {
    let result = await userModel.create(user);
    return result;
  };

  getUsers = async () => {
    let users = await userModel.find().populate("cart");
    return users.map((user) => user.toObject());
  };

  getUserById = async (_id) => {
    try {
      const user = userModel.findById(_id);
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  updateUser = async (id, update) => {
    let result = await userModel.findByIdAndUpdate(id, update);
    return result;
  };

  deleteUser = async (id) => {
    let result = await userModel.findByIdAndDelete(id);
    return result;
  };
}
