const {} = require("mongoose");
const url = `mongodb+srv://nahuelezequielcorrea:zzmXziFAu9UoBl5C@cluster0.lq5rpf5.mongodb.net/test?retryWrites=true&w=majority`;
const objConfig = {
  connectDB: async () => {
    try {
      await connect(url);
      console.log("Base de datos conectada");
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = {
  objConfig,
};
