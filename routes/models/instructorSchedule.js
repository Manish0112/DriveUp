const mongoose=require('mongoose');
const Instructor=new mongoose.Schema({
    iusername: {
        type: String,
        required: true
    },userFullName: {
        type: String,
        required: false
    },city: {
        type: String,
        required: false
    },
    sdate: {
        type: String,
        required: true
    },
    slot0810: {
        type: String,
        required: true
    },
    slot1012: {
        type: String,
        required: true
    },
    slot1214: {
        type: String,
        required: true
    },
    slot1416: {
        type: String,
        required: true
    },
    slot1618: {
        type: String,
        required: true
    },
    slot1820: {
        type: String,
        required: true
    },
    slot2022: {
        type: String,
        required: true
    }
});

const instructorSchedule=mongoose.model('instructorSchedule',Instructor);

module.exports = instructorSchedule;