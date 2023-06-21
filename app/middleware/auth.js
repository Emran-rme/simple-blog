module.exports.adminMiddleware = (req, res, next) => {
    if (!req.session.hasOwnProperty("user")) {
        return res.redirect("/auth/login");
    } else {
        if (req.session.user.role !== 2) {
            return res.redirect("/auth/login");
        }
    }
    next();
};

module.exports.authMiddleware = (req, res, next) => {
    if (!req.session.hasOwnProperty("user")) {
        return res.redirect("/auth/login");
    } else {
        if (req.session.user.role !== 1) {
            return res.redirect("/auth/login");
        }
    }
    next();
};
module.exports.loginMiddleware = (req, res, next) => {
    if (req.session.hasOwnProperty("user")) {
        if (req.session.user.role == 1) {
            return res.redirect("/author");
        } else if (req.session.user.role == 2) {
            return res.redirect("/admin/dashboard");
        }
    }
    next();
};
