exports.settingValidate = (request) => {
    const errors = [];

    if (request.site_title.trim() === "") {
        errors.push("عنوان سایت نمی تواند خالی باشد");
    }
    if (request.site_description.trim() === "") {
        errors.push("محتوای  سایت نمی تواند خالی باشد");
    }
    if (request.site_per_page.trim() === "") {
        errors.push("تعداد پست صفحه اصلی نمی تواند خالی باشد");
    }

    return errors;
};
