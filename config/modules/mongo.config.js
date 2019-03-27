module.exports = {
    auth: {
        activate: process.env.MONGO_AUTH,
        username: process.env.MONGO_USER || 'root',
        password: process.env.MONGO_PASSWORD || 'secret',
    },
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT || 27017,
    database: {
        default: process.env.MONGO_DB || 'oauth',
    }
};
