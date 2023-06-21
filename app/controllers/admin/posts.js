const { unlink } = require("node:fs/promises");

const postModel = require("@models/post");
const userModel = require("@models/user");

const { postValidation } = require("@validation/postValidation");

const { uploadService } = require("@services/uploadService");

const PresentPost = require("@presenters/post");

class Post {
    async index(req, res) {
        try {
            const posts = await postModel.getAll();
            const postForPresent = posts.map((post) => {
                const presentPost = new PresentPost(post);
                post.created_at_persian = presentPost.jalaliCreatedAt();
                return post;
            });

            res.adminRender("admin/posts/index", {
                posts: postForPresent,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async create(req, res) {
        try {
            const users = await userModel.getUsers(["id", "full_name"]);
            res.adminRender("admin/posts/createPost", {
                users,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async store(req, res) {
        const postData = {
            author_id: req.body.author_id,
            title: req.body.title,
            slug: req.body.title.trim().split(" ").join("-"),
            content: req.body.content,
            status: req.body.status,
        };

        const validateResult = postValidation(postData);

        if (validateResult.length > 0) {
            req.flash("errors", validateResult);
            return res.redirect("/admin/posts/create-new-post");
        }
        try {
            const fileName = await uploadService(req.files);
            postData.image = fileName;
            await postModel.store(postData);

            req.flash("success", "پست با موفقیت ثبت شد");
            res.redirect("/admin/posts");
        } catch (error) {
            console.log(error);
        }
    }

    async delete(req, res) {
        const deleteId = {
            id: req.body.delete_id,
        };

        try {
            const post = await postModel.getPost(deleteId.id);
            await postModel.deletePost(deleteId);
            if (post[0].image) {
                await unlink("public" + post[0].image);
            }

            res.redirect("/admin/posts");
        } catch (error) {
            console.log(error);
        }
    }

    async editForm(req, res) {
        try {
            const users = await userModel.getUsers(["id", "full_name"]);
            const post = await postModel.getPost(parseInt(req.params.id));
            post[0].image =
                post[0].image || "http://via.placeholder.com/640x360";
            res.adminRender("admin/posts/editPost", {
                users,
                post: post[0],
                helpers: {
                    isPostAuthor: function (userID, options) {
                        return post[0].author_id === userID
                            ? options.fn(this)
                            : options.inverse(this);
                    },
                    isStatus: function (status, options) {
                        console.log(status, post.status);
                        return post[0].status == status
                            ? options.fn(this)
                            : options.inverse(this);
                    },
                },
            });
        } catch (error) {
            console.log(error);
        }
    }

    async update(req, res) {
        const postId = req.params.id;
        const postData = {
            author_id: req.body.author_id,
            title: req.body.title,
            slug: req.body.title.trim().split(" ").join("-"),
            content: req.body.content,
            status: req.body.status,
        };

        const validateResult = postValidation(postData);

        if (validateResult.length > 0) {
            req.flash("errors", validateResult);
            return res.redirect("/admin/posts/edit/" + postId);
        }
        try {
            let fileName;
            if (req.files !== null) {
                fileName = await uploadService(req.files);
                postData.image = fileName;
            } else {
                postData.image = req.body.imageUrl;
            }

            await postModel.update(postId, postData);
            res.redirect("/admin/posts");
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new Post();
