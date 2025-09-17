const File = require('../models/fileModel');
const User = require('../models/userModel');
const { sendmail } = require('../services/email');
const cloudinary = require('cloudinary').v2;

function isFileType(supportedType, fileType) {
    return supportedType.includes(fileType);
}

const uploadfile = async (file, folder) => {
    const options = { folder };
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
};

exports.fileUpload = async (req, res) => {
    try {
        // get userId from body (ya token se nikal sakte ho)
        const userId = req.user.id;  

        if (!req.files || !req.files.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const file = req.files.file;
        console.log("File : ", file);

        const supportedType = ['jpg', 'png'];
        const fileType = file.name.split('.').pop().toLowerCase();

        if (!isFileType(supportedType, fileType)) {
            return res.status(400).json({
                message: "File type is not supported",
            });
        }

        // Upload to cloudinary
        const response = await uploadfile(file, 'FileLB');
        console.log("Response : ", response);

        // Save file in DB
        const filedata = await File.create({
            fileURL: response.secure_url,
            public_id: response.public_id,
            fileType: fileType,
            size: file.size
        });

        console.log("File Data:", filedata);

        // Add file _id into User model
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $push: { files: filedata._id } },  // agar multiple files allowed hain
            { new: true }
        );

        const downloadLink = response.secure_url.replace('/upload/', '/upload/fl_attachment/');
        console.log("Download Link:", downloadLink);
        await sendmail(updatedUser , downloadLink)


        res.status(200).json({
            success: true,
            message: "Your file is uploaded successfully",
            file: filedata,
            user: updatedUser
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
