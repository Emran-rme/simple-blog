const db = require("@database/mysql");

exports.countPage = async () => {
    try {
        const [result] = await db.query(
            "SELECT COUNT(id) as postCount FROM posts"
        );
        return result[0].postCount;
    } catch (error) {
        console.log(error);
    }
};

exports.getAll = async (page = 1, perPage = 3) => {
    const offset = (page - 1) * perPage;

    try {
        const [rows, fields] = await db.query(
            `SELECT p.*,u.full_name FROM posts p JOIN users u ON p.author_id=u.id ORDER BY p.created_at DESC LIMIT ${offset},
            ${perPage}`
        );
        return rows;
    } catch (error) {
        console.log(error);
    }
};

exports.store = async (postData) => {
    try {
        const [result] = await db.query(`INSERT INTO posts SET ?`, [postData]);
        return result;
    } catch (error) {
        console.log(error);
    }
};

exports.deletePost = async ({ id }) => {
    try {
        const [result] = await db.query(
            `DELETE FROM posts WHERE id=? LIMIT 1`,
            [id]
        );
        return result;
    } catch (error) {
        console.log(error);
    }
};

exports.getPost = async (postId) => {
    try {
        const [result] = await db.query(
            "SELECT * FROM posts WHERE id=? LIMIT 1",
            [postId]
        );
        return result;
    } catch (error) {
        console.log(error);
    }
};

exports.update = async (postId, updateFields) => {
    try {
        const [result] = await db.query(
            `UPDATE posts SET ? WHERE id=? LIMIT 1`,
            [updateFields, postId]
        );

        return result;
    } catch (error) {
        console.log(error);
    }
};

exports.getPostBySlug = async (slug) => {
    try {
        const [result] = await db.query(
            `SELECT *FROM posts WHERE slug=? LIMIT 1`,
            [slug]
        );
        return result[0];
    } catch (error) {
        console.log(error);
    }
};

exports.search = async (search) => {
    try {
        const [result] = await db.query(
            `SELECT p.*,u.full_name FROM posts p JOIN users u ON p.author_id=u.id WHERE title LIKE ? ORDER BY created_at DESC `,
            ["%" + search + "%"]
        );

        return result;
    } catch (error) {
        console.log(error);
    }
};
