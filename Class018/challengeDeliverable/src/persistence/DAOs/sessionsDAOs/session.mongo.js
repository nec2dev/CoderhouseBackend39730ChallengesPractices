import sessionModel from '../../mongo/models/session.model.js';

export default class SessionMongo {
    constructor() {
        console.log("Working in mongoDB with sessions");
    }
    
    createSession = async (session) => {
        try {
        let result = await sessionModel.create(session);
        return result;
        } catch (error) {
        console.log(error);
        return null;
        }
    };
    
    getSession = async (id) => {
        try {
        let session = await sessionModel.findOne({ _id: id });
        return session;
        } catch (error) {
        console.log(error);
        return null;
        }
    };
    
    deleteSession = async (id) => {
        try {
        let session = await sessionModel.deleteOne({ _id: id });
        return session;
        } catch (error) {
        console.log(error);
        return null;
        }
    };
}
