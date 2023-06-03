class UserManager {
    constructor() {
        this.users = [];
    }
    addUser(user) {
        this.users.push(user);
    }
    getUsers() {
        return this.users;
    }
}

module.exports = UserManager 