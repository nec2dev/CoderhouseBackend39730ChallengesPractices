import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    session_id: {
        type: String,
        required: true,
        unique: true
    }
});
const sessionModel = mongoose.model('Sessions', sessionSchema);

export default sessionModel;