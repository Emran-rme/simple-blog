const db = require("@database/mysql");

exports.index = async () => {
    try {
        const [rows] = await db.query("SELECT * FROM settings LIMIT 5");
        return rows;
    } catch (error) {
        console.log(error);
    }
};

exports.store = async (data) => {
    let sqlData = Object.entries(data).map(
        (item) =>
            `UPDATE settings SET setting_value='${item[1]}' WHERE setting_name='${item[0]}';`
    );
    try {
        const [result] = await db.query(sqlData.join(""));
        return result;
    } catch (error) {
        console.log(error);
    }
};
