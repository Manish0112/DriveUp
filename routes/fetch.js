var express = require('express');
var router = express.Router();
var AWS = require("aws-sdk");
const config = require("../config");


// GET list of Objects in bucket
router.get("/", function (req, res) {

    const s3FileURL = config.AWS_Uploaded_File_URL_LINK;

    let s3bucket = new AWS.S3({
        accessKeyId: config.AWS_ACCESS_KEY_ID,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
        region: config.AWS_REGION
    });

    //Location of store for file upload

    var params = {
        Bucket: config.AWS_BUCKET_NAME
    };

    s3bucket.listObjects(params, function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).json({error: true, Message: err});
        } else {
            console.log(data);
            res.send({data});
        }
    });
});


// GET specific file
router.get("/:id", function (req, res) {

    // console.log(req.params.id);


    let s3bucket = new AWS.S3({
        accessKeyId: config.AWS_ACCESS_KEY_ID,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
        region: config.AWS_REGION
    });

    //Location of store for file upload

    var params = {
        Bucket: config.AWS_BUCKET_NAME,
        Key: req.params.id,
    };

    s3bucket.getObject(params, function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).json({error: true, Message: err});
        } else {
            console.log(data);
            res.send({url: config.AWS_Uploaded_File_URL_LINK + req.params.id})

            // res.send({data});

        }
    });
});

module.exports = router;