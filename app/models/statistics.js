const db = require("@database/mysql");

exports.totalUsers = async () => {
    try {
        const [result] = await db.query(
            "SELECT COUNT(id) as totalUsers FROM `users`"
        );
        return result[0].totalUsers;
    } catch (error) {
        console.log(error);
    }
};

exports.totalComments = async () => {
    try {
        const [result] = await db.query(
            "SELECT COUNT(id) as totalComments FROM `comments`"
        );
        return result[0].totalComments;
    } catch (error) {
        console.log(error);
    }
};

exports.totalPosts = async () => {
    try {
        const [result] = await db.query(
            "SELECT COUNT(id) as totalPosts FROM `posts`"
        );
        return result[0].totalPosts;
    } catch (error) {
        console.log(error);
    }
};
exports.totalViews = async () => {
    try {
        const [result] = await db.query(
            "SELECT SUM(views) as totalViews FROM `posts`"
        );
        return result[0].totalViews;
    } catch (error) {
        console.log(error);
    }
};
