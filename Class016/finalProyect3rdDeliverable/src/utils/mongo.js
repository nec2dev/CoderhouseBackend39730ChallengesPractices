import connect from "mongoose";
class MongoSingleton {
  static #instance;
  constructor() {
    connect("mongodb://localhost:27017/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  static getInstance() {
    if (this.#instance) {
      console.log("connected");
      return this.#instance;
    }
    this.#instance = new MongoSingleton();
    console.log("connected");
    return this.#instance;
  }
}

export default MongoSingleton;
