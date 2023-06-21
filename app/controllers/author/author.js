const postModel = require("@models/post");

class Author {
    async index(req, res) {
        try {
            const posts = await postModel.getAll();
            const postInit = posts.map((post) => {
                post.created_at_persian = toPersianData(post.created_at);

                return post;
            });

            res.authorRender("author/posts/index", {
                posts: postInit,
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new Author();
