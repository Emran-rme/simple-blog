const db = require("@database/mysql");
const { createAndUpdateUser } = require("@services/authService");

exports.getUsers = async (columns = []) => {
    const sqlColumns = columns.length > 0 ? columns.join(",") : "*";
    try {
        const [rows, fields] = await db.query(
            `SELECT ${sqlColumns} FROM users ORDER BY created_at DESC`
        );
        return rows;
    } catch (error) {
        console.log(error);
    }
};

exports.store = async (userData) => {
    const data = {
        ...userData,
        password: createAndUpdateUser(userData.password),
    };
    try {
        const [result] = await db.query(`INSERT INTO users SET ?`, [data]);
        console.log(result);
        return result.affectedRows > 0 ? result : false;
    } catch (error) {
        console.log(error);
    }
};

exports.delete = async ({ id }) => {
    try {
        const [result] = await db.query(
            `DELETE FROM users WHERE id=? LIMIT 1`,
            [id]
        );
        return result;
    } catch (error) {
        console.log(error);
    }
};

exports.getUser = async (userId) => {
    try {
        const [result] = await db.query(
            `SELECT * FROM users WHERE id=? LIMIT 1`,
            [userId]
        );
        return result[0];
    } catch (error) {
        console.log(error);
    }
};

exports.update = async (userData, userId) => {
    const data = {
        ...userData,
        password: createAndUpdateUser(userData.password),
    };

    try {
        const [result] = await db.query(
            `UPDATE users SET ? WHERE id=? LIMIT 1`,
            [data, userId]
        );
        return result;
    } catch (error) {
        console.log(error);
    }
};

exports.findUserByEmail = async (email) => {
    try {
        const [result] = await db.query(
            "SELECT * FROM users WHERE email=? LIMIT 1",
            [email]
        );
        return result[0];
    } catch (error) {
        console.log(error);
    }
};
