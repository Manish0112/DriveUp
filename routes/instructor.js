var express = require('express');
var router = express.Router();
var AWS = require("aws-sdk");
const multer = require("multer");
const config = require("../config");
var mysql = require('./db/sql');
var moment = require('moment');
const instructorschedule= require('./models/instructorSchedule');
const Student = require('./models/StudentDetails');

router.get('/getISchedule', async function (req, res) {
//instructorschedules
var name=req.session.username;
console.log("Fetching schedules"); 
if(name==='admin'){

    await instructorschedule.find((err, data) => {
        res.statusMessage = "Fetch Complete";
        res.status(200).send({result: data});
    });
} else{
await instructorschedule.find({ iusername : name },(err, data) => {
    res.statusMessage = "Fetch Complete";
    res.status(200).send({result: data});
});
}

});


// GET to upload
router.post('/createinstructorSchedule', async function (req, res) {
    console.log("insert instructor schedules!",req.session.username);
    var username=req.session.username;
    var instructorcity="";
    var userFullName=req.session.userFullName;


     await Student.findOne({ Name:username })
        .then(student => {
            
            if(student){
                req.session.city = student.City;
                instructorcity = student.City;

                console.log(req.session.city);
            }
            else{
                instructorcity = "NA";

            }
            
        });


var now = moment(req.body.fromdate);
var later = moment(req.body.todate);
var cnt=(later.diff(now,"days")+1);
var dateArray = [];
for(var i=0; i<cnt; i++){
    dateArray.push(now.format("DD-MMM-YYYY"));
    now = moment(now, "DD-MM-YYYY").add(1, 'days');

}
async function init(){
    console.log(1)
    await sleep(1000)
    console.log(2)
 }
function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

dateArray.forEach(async function(value){
        console.log(value);
        console.log(instructorcity);
        await init();

        await instructorschedule.findOne({$and:[{ iusername : username} ,{sdate : now.format("DD-MMM-YYYY")}]})
        .then(ischedule => {
            
            if(ischedule){
                console.log("Schedule present for date"+value);
            }else{
            
                const ISchedule =  new instructorschedule({
                    iusername : username,
                    sdate : value,
                    UserFullName:userFullName,
                    city:instructorcity,
                    slot0810:req.body.slot0810,
                    slot1012:req.body.slot1012,
                    slot1214:req.body.slot1214,
                    slot1416:req.body.slot1416,
                    slot1618:req.body.slot1618,
                    slot1820:req.body.slot1820,
                    slot2022:req.body.slot2022
                  });
                  
                  ISchedule.save()
                  .then(user => {
                      console.log('Schedule created!');

                  })
                  .catch(err=>{
                      console.log(err);
                      //Next Day
                    });
            }
        })
        //Next Day
       // now = moment(now, "DD-MM-YYYY").add(1, 'days');
    });
   

      //{"_id":{"$oid":"5ddf7d6e1c9d440000467c4e"},"instructorID":"1","sdate":{"$date":{"$numberLong":"1573459200000"}},"slot0810":"Y","slot1012":"Y","slot1214":"Y","slot1416":"Y","slot1618":"Y","slot1820":"Y","slot2022":"Y"}
    res.statusMessage = "Schedule Created";      
    res.status(200).send({message: "Got result from GET"});
});

router.post('/updateIdetails', function (req, res, next) {
    // var user_id = req.file;
    // console.log(user_id);
    // console.log("INside /insert" +  "withoutbody" +req.body);

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

router.post('/deleteISdetails', function (req, res, next) {

//instructorschedules
var name=req.session.username;
var deletiondate=req.body.sdate;  

instructorschedule.deleteOne({ iusername : name ,sdate:deletiondate },(err, data) => {
    console.log(data);
    res.statusMessage = "delete Complete";
    res.status(200).send({result: data});
});

});


module.exports = router;