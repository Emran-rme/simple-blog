const bcrypt = require("bcrypt");

exports.checkUser = async (userData, data) => {
    const { email, password } = userData;

    const match = await bcrypt.compare(password, data.password);
    if (match) {
        return true;
    }
    return false;
};

exports.createAndUpdateUser = (password) => {
    const hashPassword = bcrypt.hashSync(password, 10);
    return hashPassword;
};
