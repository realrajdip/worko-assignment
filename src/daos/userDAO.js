const User = require('../models/User');

class UserDAO {
    async create(user) {
        const newUser = new User(user);
        return await newUser.save();
    }

    async findAll() {
        return await User.find({ isDeleted: false });
    }

    async findById(id) {
        return await User.findOne({ _id: id, isDeleted: false });
    }

    async update(id, user) {
        return await User.findByIdAndUpdate(id, user, { new: true });
    }

    async delete(id) {
        return await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    }
}

module.exports = new UserDAO();
