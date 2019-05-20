const fs = require('fs');

module.exports = {
    uploadFile: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let uploadedFile = req.files.upload;
        console.log("In uploadFile.js: " + req.files.upload.name);
        let image_name = uploadedFile.name;
        
        uploadedFile.mv(`public/uploads/${image_name}`, (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            // send the file's name to the database
            let query = "INSERT INTO `upload` (upload) VALUES ('" + image_name + "')";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
            });
        });
    }
}