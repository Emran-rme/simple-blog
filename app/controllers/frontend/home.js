const _ = require("lodash");

const settingModel = require("@models/setting");
const postModel = require("@models/post");
const userModel = require("@models/user");
const commentModel = require("@models/comment");

const { avatar } = require("../../services/userService");

const Post = require("@presenters/post");

class Home {
    async index(req, res) {
        try {
            const totalPosts = await postModel.countPage();
            const settings = await settingModel.index();

            const totalPage = Math.ceil(
                totalPosts / parseInt(settings[2].setting_value)
            );

            const page = "page" in req.query ? parseInt(req.query.page) : 1;

            const pagination = {
                page,
                totalPage,
                nextPage: page < totalPage ? page + 1 : totalPage,
                prevPage: page > 1 ? page - 1 : 1,
                hasNextPage: page < totalPage,
                hasPrevPage: page > 1,
            };

            const posts = await postModel.getAll(
                page,
                settings[2].setting_value
            );

            const postForPresent = posts.map((post) => {
                const presentPost = new Post(post);
                post.jalali_date = presentPost.jalaliCreatedAt();
                post.excerpt = presentPost.excerpt();
                return post;
            });

            res.frontRender("frontend/index", {
                title: settings[0].setting_value,
                description: settings[1].setting_value,
                bodyClass: "bg-gray",
                posts: postForPresent,
                pagination,
                helpers: {
                    showDisabled: (isDisabled, options) => {
                        return !isDisabled ? "disabled" : "";
                    },
                },
            });
        } catch (error) {
            console.log(error);
        }
    }

    async showPost(req, res) {
        try {
            let post = await postModel.getPostBySlug(req.params.slug);

            if (!post) {
                return res.redirect("/404");
            }

            let user = await userModel.getUser(post.author_id);
            let comments = await commentModel.findByPostId(post.id);

            const presentPost = new Post(post);

            post.jalaliDate = presentPost.jalaliCreatedAt();
            post.authorFullName = user.full_name;
            post.authorDescription = user.description;
            post.authorAvatar = avatar(user.email);

            let formData = {
                user_name: "",
                user_email: "",
            };

            if ("user" in req.session) {
                formData = {
                    user_name: req.session.user.full_name,
                    user_email: req.session.user.email,
                };
            }

            const presentersComment = comments.map((comment) => {
                const presentComment = new Post(comment);
                comment.authorAvatar = avatar(comment.user_email);
                comment.jalaliDate = presentComment.jalaliCreatedAt();
                return comment;
            });

            const newComment = _.groupBy(presentersComment, "parent");

            res.frontRender("frontend/singlePost", {
                title: post.title,
                description: presentPost.excerpt(),
                post,
                comments: newComment[0],
                formData,
                bodyClass: "single-post",
                helpers: {
                    randomNumber: (number, options) => {
                        return Math.floor(Math.random() * number) + 1;
                    },
                    hasChildren: (commentID, options) => {
                        return commentID in newComment;
                    },
                    getChildren: (commentID, options) => {
                        return newComment[commentID];
                    },
                },
            });
        } catch (error) {
            console.log(error);
        }
    }

    async search(req, res) {
        try {
            const posts = await postModel.search(req.query.q);

            const postForPresent = posts.map((post) => {
                const presentPost = new Post(post);
                post.jalali_date = presentPost.jalaliCreatedAt();
                post.excerpt = presentPost.excerpt();
                return post;
            });

            res.frontRender("frontend/search", {
                title: "جستجو",
                description: "جستجوی مطلب",
                bodyClass: "bg-gray",
                posts: postForPresent,
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new Home();
