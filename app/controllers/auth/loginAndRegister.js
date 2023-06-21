const {
    loginValidation,
    registerValidation,
} = require("@validation/authValidation");
const userModel = require("@models/user");
const { checkUser } = require("@services/authService");

class Auth {
    showLogin(req, res) {
        res.authRender("auth/login");
    }

    async doLogin(req, res) {
        const resultValidation = loginValidation(req.body);
        if (resultValidation.length > 0) {
            req.flash("errors", resultValidation);
            return res.redirect("/auth/login");
        }

        const user = await userModel.findUserByEmail(req.body.email);
        const result = await checkUser(req.body, user);

        if (result) {
            req.session.user = user;
            console.log(req.session);
            res.redirect(
                req.session.user.role == 2
                    ? "/admin/dashboard"
                    : req.session.user.role == 1
                    ? "/author"
                    : "/"
            );
        } else {
            req.flash("errors", ["نام کاربری یا رمز عبور اشتباه است"]);
            res.redirect("/auth/login");
        }
    }

    showRegister(req, res) {
        res.authRender("auth/register");
    }

    async doRegister(req, res) {
        const data = {
            full_name: "کاربر ناشناس",
            email: req.body.email,
            password: req.body.password,
            role: 0,
        };

        const resultValidation = registerValidation(req.body);
        if (resultValidation.length > 0) {
            req.flash("errors", resultValidation);
            return res.redirect("/auth/register");
        }
        try {
            const user = await userModel.findUserByEmail(req.body.email);

            if (user) {
                req.flash(
                    "errors",
                    "شما قبلا ثبت نام کرده اید در صورت فراموشی رمز عبور ، رمز خودر را بازیابی کنید"
                );
                return res.redirect("/auth/register");
            }

            const result = userModel.store(data);
            if (result) {
                return res.redirect("/auth/login");
            }
        } catch (error) {
            console.log(error);
        }

        res.redirect("/auth/register");
    }

    async logout(req, res) {
        try {
            await req.session.destroy((error) => {
                res.redirect("/auth/login");
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new Auth();
