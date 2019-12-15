const mongoose=require('mongoose');
const StudentSchema=new mongoose.Schema({

    Name: {
        type: String,
        required: true
    },
    Minor: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Country: {
        type: String,
        required: true
    },
    PhoneNumber: {
        type: String,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    DOB: {
        type: String,
        required: true
    },
    ctype: {
        type: String,
        required: false
    },
    dualcontrol: {
        type: String,
        required: false
    },
    ilicence: {
        type: String,
        required: false
    },
    schedule : {
        type: Array,
        required: false
    },
    plansummary : {
        type : {},
        required: false
    },UserFullName: {
        type: String,
        required: false
    },
    rating: {
        type: String,
        required: false
    }    
});

const Student=mongoose.model('Student',StudentSchema);

module.exports = Student;