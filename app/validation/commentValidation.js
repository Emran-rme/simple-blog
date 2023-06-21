exports.commentValidation = (request) => {
    let errors = [];

    if (request.user_name.trim() === "") {
        errors.push("نام و نام خانوادگی نمی تواند خالی باشد");
    }
    if (request.user_email.trim() === "") {
        errors.push("ایمیل نمی تواند خالی باشد");
    }
    if (request.comment.trim() === "") {
        errors.push("محتوای کامنت نمی تواند خالی باشد");
    }
    return errors;
};
