exports.postValidation = (request) => {
    const errors = [];
    if (request.title.trim() === "") {
        errors.push("عنوان نمی تواند خالی باشد");
    }
    if (request.title.trim().length < 5) {
        errors.push("عنوان باید بیشتر از 5 کارکتر باشد");
    }

    if (request.author_id === undefined) {
        errors.push("نویسنده نمی تواند خالی باشد");
    }

    if (request.content.trim() === "") {
        errors.push("محتوای مطلب نمی تواند خالی باشد");
    }

    return errors;
};
