const path = require("path");

const express = require("express");
const RedisStore = require("connect-redis").default;
const session = require("express-session");
const flash = require("connect-flash");
const { engine } = require("express-handlebars");
const fileUpload = require("express-fileupload");
// const sessionStore = require("./session/mysql")(session);
const sessionStore = require("./session/redis")(RedisStore);

module.exports = (app) => {
    app.use(fileUpload({
        createParentPath: true,
        useTempFiles:true,
     }));

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(
        session({
            secret: "SecretKey",
            store: sessionStore,
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false },
            unset: "destroy",
        })
    );
    app.use(flash());
    app.engine("handlebars", engine());
    app.set("view engine", "handlebars");
    app.set("views", path.join(__dirname, "../views"));
    app.use(express.static(path.join(__dirname, "../../public")));
};
