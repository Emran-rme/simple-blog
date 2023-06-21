const commentModel = require("@models/comment");

const { toPersianData } = require("@services/dateService");
const { avatar } = require("@services/userService");

class Comment {
    async index(req, res) {
        const comments = await commentModel.getAll();
        const newCommentsList = comments.map((comment) => {
            comment.created_at_persian = toPersianData(comment.created_at);
            comment.userAvatar = avatar(comment.user_email);
            comment.status == 2
                ? (comment.class = "bg-dark")
                : (comment.class = "");
            return comment;
        });

        res.adminRender("admin/comments", {
            comments: newCommentsList,
        });
    }

    async changeStatus(req, res) {
        if (req.params.id) {
            if ([0, 2].includes(parseInt(req.query.status))) {
                await commentModel.commentStatus(
                    req.query.status,
                    req.params.id
                );
                return res.redirect("/admin/comments");
            }
            if (parseInt(req.query.status) === 1) {
                await commentModel.deleteComment(req.params.id);
                return res.redirect("/admin/comments");
            }
            return res.redirect("/admin/comments");
        }
        return res.redirect("/admin/comments");
    }
}

module.exports = new Comment();
