module.exports = (session) => {
    const MySQLStore = require("express-mysql-session")(session);

    const options = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        clearExpired: true,
        // expiration: 5000,
        expiration: 86400000,
    };

    return new MySQLStore(options);
};
