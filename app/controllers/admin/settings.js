const settingModel = require("@models/setting");
const { settingValidate } = require("@validation/settingValidation");

class Setting {
    async index(req, res) {
        try {
            const obj = {};
            const settings = await settingModel.index();

            settings.map((setting) => {
                obj[setting.setting_name] = setting.setting_value;
                return obj;
            });

            res.adminRender("admin/settings/index", {
                settingData: obj,
                helpers: {
                    isRegisterSwitcher: function (data, options) {
                        return obj.is_register == data
                            ? options.fn(this)
                            : options.inverse(this);
                    },
                    isCommentSwitcher: function (data, options) {
                        return obj.is_comment == data
                            ? options.fn(this)
                            : options.inverse(this);
                    },
                },
            });
        } catch (error) {
            console.log(error);
        }
    }

    async store(req, res) {
        const data = {
            ...req.body,
            is_register: req.body.is_register === "on" ? "1" : "0",
            is_comment: req.body.is_comment === "on" ? "1" : "0",
        };
        const resultValidate = settingValidate(data);
        if (resultValidate.length > 0) {
            req.flash("errors", resultValidate);
            return res.redirect("/admin/settings");
        }
        try {
            await settingModel.store(data);
            req.flash("success", "تنظیمات ویرایش شد");
        } catch (error) {
            console.log(error);
        }

        res.redirect("/admin/settings");
    }
}

module.exports = new Setting();
