const gravatar = require("gravatar");

exports.avatar = (userEmail) => {
    return gravatar.url(userEmail);
};
