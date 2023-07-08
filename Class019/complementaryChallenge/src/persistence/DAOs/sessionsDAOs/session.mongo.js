import sessionModel from "../../mongo/models/session.model.js";

export default class SessionMongo {
  getSession = async (id) => {
    try {
      let session = await sessionModel.findOne({ _id: id });
      return session;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
