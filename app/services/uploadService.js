const { cwd } = require("node:process");

const { v4: uuidv4 } = require("uuid");

exports.uploadService = (fileData) => {
    if (fileData.image) {
        const fileExt = fileData.image.name.split(".")[1];
        const newFileName = `${uuidv4()}.${fileExt}`;
        const fileNewPath = `${cwd()}/public/uploads/${newFileName}`;
        let recordName = fileNewPath.split("/");
        let recordIndex = recordName.findIndex((item) => item === "public");
        recordName =
            "/" +
            recordName.slice(recordIndex + 1, recordName.length).join("/");

        fileData.image.mv(fileNewPath, (err) => {
            console.log(err);
        });
        return recordName;
    }
};
