const adminRouter = require("./admin");
const authRouter = require("./auth");
const authorRouter = require("./author");
const homeRouter = require("./frontend");

const authController = require("@controllers/auth/loginAndRegister");

const {
    authMiddleware,
    adminMiddleware,
    loginMiddleware,
} = require("@middleware/auth");

module.exports = (app) => {
    app.use("/", homeRouter);
    app.use("/admin", [adminMiddleware], adminRouter);
    app.use("/auth", [loginMiddleware], authRouter);
    app.get("/logout", authController.logout);
    app.use("/author", [authMiddleware], authorRouter);
};
