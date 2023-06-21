const moment = require("jalali-moment");

exports.toPersianData = (data, format = "YYYY/MM/DD") => {
    return moment(data).locale("fa").format(format);
};
