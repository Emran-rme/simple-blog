const userModel = require("@models/user");
const { toPersianData } = require("@services/dateService");
const { userValidation } = require("@validation/userValidation");

class User {
    async index(req, res) {
        try {
            const users = await userModel.getUsers();
            const newUsersList = users.map((user) => {
                user.created_at_persian = toPersianData(user.created_at);
                return user;
            });

            res.adminRender("admin/users/index", {
                users: newUsersList,
            });
        } catch (error) {
            console.log(error);
        }
    }

    create(req, res) {
        res.render("admin/users/createUser", {
            layout: "admin",
            messages: req.flash("errors"),
        });
    }
    async store(req, res) {
        const data = {
            full_name: req.body.full_name,
            description: req.body.description,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
        };

        const validateResult = userValidation(data);

        if (validateResult.length > 0) {
            req.flash("errors", validateResult);
            return res.redirect("/admin/users/create-new-user");
        }

        try {
            await userModel.store(data);
            req.flash("success", "کاربر با موفقیت ثبت شد");
            res.redirect("/admin/users");
        } catch (error) {
            console.log(error);
        }
    }

    async delete(req, res) {
        try {
            const userId = {
                id: req.body.delete_id,
            };
            await userModel.delete(userId);
            req.flash("success", "کاربر با موفقیت حذف شد");
            res.redirect("/admin/users");
        } catch (error) {
            console.log(error);
        }
    }

    async editForm(req, res) {
        try {
            const user = await userModel.getUser(req.params.id);
            res.adminRender("admin/users/editUser", {
                user,
                helpers: {
                    isRole: function (role, options) {
                        return user.role == role
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
        const data = {
            full_name: req.body.full_name,
            description: req.body.description,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
        };

        const validateResult = userValidation(data);

        if (validateResult.length > 0) {
            req.flash("errors", validateResult);
            return res.redirect("/admin/users/edit/" + req.params.id);
        }
        try {
            await userModel.update(data, req.params.id);
            req.flash("success", "کاربر با موفقیت ویرایش شد");
            res.redirect("/admin/users");
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new User();
