const userService = require("@services/userService");

module.exports = (app) => {
    app.use((req, res, next) => {
        const errors = req.flash("errors");
        const success = req.flash("success");
        const hasError = errors.length > 0;
        let user;
        if ("user" in req.session) {
            user = req.session.user;
            user.avatar = userService.avatar(user.email);
        }

        res.adminRender = (template, options) => {
            options = {
                ...options,
                layout: "admin",
                user,
                errors,
                hasError,
                success,
            };
            res.render(template, options);
        };

        res.authRender = (template, options) => {
            options = {
                ...options,
                layout: "auth",
                errors,
                hasError,
                success,
            };
            res.render(template, options);
        };

        res.authorRender = (template, options) => {
            options = {
                ...options,
                layout: "author",
                user,
                errors,
                hasError,
                success,
            };
            res.render(template, options);
        };

        res.frontRender = (template, options) => {
            options = {
                ...options,
                layout: "frontend",
                errors,
                hasError,
                success,
            };
            res.render(template, options);
        };
        next();
    });
};
