const userDAO = require('../daos/userDAO');

class UserService {
    async createUser(user) {
        return await userDAO.create(user);
    }

    async getAllUsers() {
        return await userDAO.findAll();
    }

    async getUserById(id) {
        return await userDAO.findById(id);
    }

    async updateUser(id, user) {
        return await userDAO.update(id, user);
    }

    async deleteUser(id) {
        return await userDAO.delete(id);
    }
}

module.exports = new UserService();
