exports.loginValidation = (request) => {
    let errors = [];
    if (request.email.trim() === "") {
        errors.push("ایمیل نمیتواند خالی باشد");
    }
    if (request.password === "") {
        errors.push("رمز عبور نمیتواند خالی باشد");
    }

    return errors;
};

exports.registerValidation = (request) => {
    const errors = [];
    if (request.email.trim() === "") {
        errors.push("ایمیل نمیتواند خالی باشد");
    }
    if (request.password === "") {
        errors.push("رمز عبور نمیتواند خالی باشد");
    }
    if (request.password === "") {
        errors.push("تکرار رمز عبور نمیتواند خالی باشد");
    } else if (request.password !== request.password_confirmation) {
        errors.push("رمز عبور یکسان نمی باشد");
    }
    return errors;
};
