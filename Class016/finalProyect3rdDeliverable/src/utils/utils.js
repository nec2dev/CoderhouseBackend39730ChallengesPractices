import bCrypt from "bcrypt-nodejs";

const createHash = (password) => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

const isValidPassword = (userPassword, password) => {
  return bCrypt.compareSync(password, userPassword);
};

export default {
  createHash,
  isValidPassword,
};
