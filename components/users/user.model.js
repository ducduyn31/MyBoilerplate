const mongoose = require('mongoose');
const _ = require('lodash');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    accessToken: String,
    refreshToken: String,
    expiresAt: Date,
});

userSchema.statics = {

    async findOneOrCreate(query, data) {
        const user = await this.model('User').findOne(query);
        if (user) return user;

        return await this.model('User', userSchema)(_.pickBy(_.assign({}, query, data), s => s !== '_id')).save();
    }
};


module.exports = mongoose.model('User', userSchema);
