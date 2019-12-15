var express = require('express');
var router = express.Router();
var AWS = require("aws-sdk");
const multer = require("multer");
const config = require("../config");
var mysql = require('./db/sql');

var storage = multer.memoryStorage();
var upload = multer({storage: storage, limits: {fileSize: 10 * 1024 * 1024}});


// GET to upload
router.get('/', function (req, res) {
    console.log("GET API /upload called!");
    res.status(200).send({message: "Got result from GET"});
});


// POST to upload
// upload file to s3 and log file details
router.post("/", upload.single("file"), function (req, res) {
    //File Upload started


    // console.log("req2");
    // console.log(req);
    var startDate = new Date();

    const file = req.file;

    const s3FileURL = config.AWS_Uploaded_File_URL_LINK;

    let s3bucket = new AWS.S3({
        accessKeyId: config.AWS_ACCESS_KEY_ID,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
        region: config.AWS_REGION
    });

    //Location of store for file upload

    var params = {
        Bucket: config.AWS_BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read"
    };


    s3bucket.upload(params, function (err, data) {
        var cnt = "";

        if (err) {
            res.status(500).json({error: true, Message: err});
        } else {
            //success
            var url=data.Location;
            url = url.replace('https://cmpe281dropboxfiles.s3.us-west-1.amazonaws.com', 'https://d2jq6vuif68y2f.cloudfront.net');
console.log(url);

            console.log(data.Location);
            res.send({data});

            //File Upload ended       
            var endDate = new Date();
            console.log(`Difference in seconds:` + (endDate - startDate) / 1000);
            //insert in database
            var newFileUploaded = {
                description: req.body.description,
                fileLink: s3FileURL + file.originalname,
                s3_key: params.Key
            };
            //check if already exisits

            var sqlfetchQuery = "select count(*) as cnt from `dropboxmysql`.`user_files` where ( file_name = '" + file.originalname + "')";
            console.log(sqlfetchQuery);
            //Number cnt = 0;
            mysql.fetchData(function (err, results) {
                if (err) {
                    console.log(err);
                    //throw err;
                }
                else {

                    console.log("fetch Complete");
                    console.log(results);
                    console.log(results[0].cnt);
                    cnt = results[0].cnt;
                    console.log(cnt);

                    if (Number(cnt) > 0) {
                        //update data
                        var sqlupdateQuery = "UPDATE `dropboxmysql`.`user_files` SET `fileuploadtime` = '" + ((endDate - startDate) / 1000) + "', `filemodifieddate` = now() ,`filedesc` = 'File Updated' WHERE (`file_name` = '" + file.originalname + "')";
                        console.log(sqlupdateQuery);

                        mysql.fetchData(function (err, results) {
                            if (err) {
                                console.log(err);
                                //throw err;
                            }
                            else {

                                console.log("update Complete");


                            }
                        }, sqlupdateQuery);


                    }
                    else {
                        //insert data
                        var sqlinsertQuery = "INSERT INTO `dropboxmysql`.`user_files` (`userid`, `file_name`,`filedesc`, `fileuploadtime`, `filemodifieddate`, `filecreatedate`, `fileurl`) VALUES ('" + req.session.user_id + "','" + file.originalname + "','" + req.body.description + "', '" + ((endDate - startDate) / 1000) + "', " + "now()" + ", " + "now()" + ", '" + url + "')";
                        console.log(sqlinsertQuery);

                        mysql.fetchData(function (err, results) {
                            if (err) {
                                console.log(err);
                                // throw err;
                            }
                            else {

                                console.log("Insert Complete");

                            }
                        }, sqlinsertQuery);
                    }


                }
            }, sqlfetchQuery);


        }
    });

});

// POST to delete
// delete from s3 bucket
router.post("/delete", function (req, res) {


    let s3bucket = new AWS.S3({
        accessKeyId: config.AWS_ACCESS_KEY_ID,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
        region: config.AWS_REGION
    });

    //Location of store for file upload

    var params = {
        Bucket: config.AWS_BUCKET_NAME,
        Key: req.body.fileName,
    };


    s3bucket.deleteObject(params, function (err, data) {

        if (err) {
            res.status(500).json({error: true, Message: err});
        } else {

            var sqldeleteQuery = "    DELETE FROM `dropboxmysql`.`user_files` WHERE (`file_name` = '" + req.body.fileName + "')";

            mysql.fetchData(function (err, results) {
                if (err) {
                    console.log(err);
                    //throw err;
                }
                else {

                    res.send({data});
                }
            }, sqldeleteQuery);

        }
    });


});


router.get('/test', function (req, res) {

    console.log("INside /test");
    var a = Number('1');
    console.log(a === 1);
    console.log(Number('1') === 1);
    console.log(Number('1') > 0);

    var sqlQuery = "SELECT * from user_data";


    mysql.fetchData(function (err, results) {
        if (err) {
            throw err;
        }
        else {

            console.log("Fetch Project Details Successful!");
            res.statusMessage = "Data fetched";
            res.status(200).send({result: results});

        }
    }, sqlQuery);


});


router.post('/updateuser', function (req, res, next) {
    // var user_id = req.file;
    // console.log(user_id);
    // console.log("INside /insert" +  "withoutbody" +req.body);
    console.log(req.body);
    console.log("full request " + req);
    console.log(req);

    var sqlQuery = "UPDATE `dropboxmysql`.`user_data` SET `password` = '" + req.body.password + "',`firstname` = '" + req.body.firstname + "',`lastname` = '" + req.body.lastname + "',`email` = '" + req.body.email + "',`phone`= '" + req.body.phone + "',`modifieddate`=now()  WHERE (`username` = '" + req.body.username + "')";

    console.log(sqlQuery);

    mysql.fetchData(function (err, results) {
        if (err) {
            throw err;
        }
        else {

            console.log("Insert Complete");
            res.statusMessage = "Insert Complete";
            res.status(200).send({result: results});

        }
    }, sqlQuery);


});

router.post('/deleteuser', function (req, res, next) {


    var sqlQuery = "delete from `dropboxmysql`.`user_data`   WHERE (`username` = '" + req.body.username + "')";

    console.log(sqlQuery);

    mysql.fetchData(function (err, results) {
        if (err) {
            throw err;
        }
        else {

            console.log("Record deleted Complete");
            res.statusMessage = "Delete Complete";
            res.status(200).send({result: results});

        }
    }, sqlQuery);


});


module.exports = router;