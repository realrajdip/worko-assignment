const userService = require('../services/userService');
const { validateUser, validateId } = require('../validators/userValidator');

class UserController {
    async createUser(req, res) {
        try {
            const { error } = validateUser(req.body);
            if (error) return res.status(400).send(error.details[0].message);

            const user = await userService.createUser(req.body);
            res.status(201).send(user);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.send(users);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async getUserById(req, res) {
        try {
            const { error } = validateId(req.params);
            if (error) return res.status(400).send(error.details[0].message);

            const user = await userService.getUserById(req.params.userId);
            if (!user) return res.status(404).send('User not found');
            res.send(user);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async updateUser(req, res) {
        try {
            const { error } = validateId(req.params);
            if (error) return res.status(400).send(error.details[0].message);

            const user = await userService.updateUser(req.params.userId, req.body);
            if (!user) return res.status(404).send('User not found');
            res.send(user);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async deleteUser(req, res) {
        try {
            const { error } = validateId(req.params);
            if (error) return res.status(400).send(error.details[0].message);

            const user = await userService.deleteUser(req.params.userId);
            if (!user) return res.status(404).send('User not found');
            res.send(user);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = new UserController();
