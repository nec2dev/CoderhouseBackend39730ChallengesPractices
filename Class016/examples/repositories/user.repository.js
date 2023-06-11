const Repository = require("./repository.js");

class UserRepository extends Repository {
  constructor(dao) {
    console.log("Working in mongoDB with users");
    super(dao);
  }

  createUser = async (user) => {
    let result = await userModel.create(user);
    return result;
  };

  getUsers = async () => {
    let users = await userModel.find().lean();
    return users;
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

module.exports = UserRepository;
