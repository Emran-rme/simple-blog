const db = require("@database/mysql");

exports.getAll = async () => {
    try {
        const [rows, fields] = await db.query(
            `SELECT c.*,p.title,p.slug FROM comments c JOIN posts p ON c.post_id=p.id ORDER BY c.created_at DESC`
        );
        return rows;
    } catch (error) {
        console.log(error);
    }
};

exports.commentStatus = async (status, commentId) => {
    try {
        const [result] = await db.query(
            `UPDATE comments SET status=? WHERE id=? LIMIT 1`,
            [status, commentId]
        );
        return result;
    } catch (error) {
        console.log(error);
    }
};

exports.deleteComment = async (commentId) => {
    try {
        const [result] = await db.query(
            `DELETE FROM comments WHERE id=? LIMIT 1`,
            [commentId]
        );
        return result;
    } catch (error) {
        console.log(error);
    }
};

exports.findByPostId = async (postId) => {
    const [result] = await db.query(
        `SELECT * FROM comments WHERE post_id =? AND status=?`,
        [postId, 2]
    );
    return result;
};

exports.store = async (commentData) => {
    try {
        const [result] = await db.query(`INSERT INTO comments SET ?`, [
            commentData,
        ]);
        return result;
    } catch (error) {
        console.log(error);
    }
};
