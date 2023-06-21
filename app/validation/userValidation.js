const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

exports.userValidation = (request) => {
    const errors = [];
    if (request.full_name.trim() === "") {
        errors.push("نام و نام خانوادگی نمی تواند خالی باشد");
    }
    if (request.full_name.trim().length < 3) {
        errors.push("نام و نام خانوادگی باید بیشتر از 5 کارکتر باشد");
    }

    if (request.email.trim() === "") {
        errors.push("ایمیل نمی تواند خالی باشد");
    }

    if (!validateEmail(request.email)) {
        errors.push("ساختار ادرس ایمیل صحیح نمی باشد");
    }
    if (request.password.trim() === "") {
        errors.push("رمز عبور نمی تواند خالی باشد");
    }

    return errors;
};
