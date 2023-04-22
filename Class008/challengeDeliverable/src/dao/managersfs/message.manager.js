import fs from 'fs';

class MessageManager {
    constructor(path) {
        this.path = path;
    }

    getMessages = async () => {
        try {
            const objs = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(objs);
        } 
        catch (err) {
            if (err.message.includes('no such file or directory')) return [];
            else console.log(err.message);
        }
    }

    addMessage = async (message) => {
        const db = await this.getMessages();
        try {
            if (db.length === 0) {
                let newId = 1;
                const newMessage = { ...message, id: newId };
                db.push(newMessage);
            }
            else {
                let newId = Math.max(...db.map(message => message.id)) + 1;
                const newMessage = { ...message, id: newId };
                db.push(newMessage);
            }
            await this.writeFile(db);
        }
        catch (err) {
            console.log(err.message);
        }
    }

    deleteMessege = async (id) => {
        let messege = await this.getMessages();
        try {
            messeges = messeges.filter(messege => messege.id != id);
            await this.writeFile(messeges);
            return messeges;
        }
        catch (err) {
            console.log(err.message);
        }
    }
}

export default MessageManager;