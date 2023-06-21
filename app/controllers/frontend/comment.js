const commentModel = require("@models/comment");
const { commentValidation } = require("@validation/commentValidation");

class Comment {
    async store(req, res) {
        const validateResult = commentValidation(req.body);

        if (validateResult.length > 0) {
            req.flash("errors", validateResult);
            return res.redirect(`/posts/${req.params.slug}`);
        }

        const commentData = {
            user_name: req.body.user_name,
            user_email: req.body.user_email,
            user_url: req.body.user_url,
            comment: req.body.comment,
            post_id: req.body.post_id,
            author_id: req.session.user.id ? req.session.user.id : null,
            parent: parseInt(req.body.comment_id)
                ? parseInt(req.body.comment_id)
                : 0,
        };

        try {
            await commentModel.store(commentData);
            req.flash(
                "success",
                "کامنت شما با موفقیت ثبت شد بعد از تایید نمایش داده خواهد شد"
            );
            return res.redirect(`/posts/${req.params.slug}`);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new Comment();
