import axios from 'axios';
import { message } from "antd/lib/index";

// const api = process.env.SERVER_URL || 'http://3.19.209.141:3001';
 const api = process.env.SERVER_URL || 'http://localhost:3001';
//const api = process.env.SERVER_URL || 'http://dropboxapp.cmibwegni2.us-east-2.elasticbeanstalk.com';


axios.defaults.withCredentials = true;


export const RESTService = {
    login,
    getTableData,
    register,
    upload,
    deleteFile,
    checkLogin,
    getUserTableData,
    deleteUser,
    logout,
    oAuthlogin,
    checkProfile,
    enroll,
    getinstructorSchedule,
    deleteISdetails,
    createinstructorSchedule,
    getloggedInUserData,
    getInstructorsForDates,
    saveSummary,
    getAppointments,
    validateEnroll,
    getResources,
    getUserdata,
    rating,
    payment
};


function login(data) {
    let url = api + '/login';
    return axios.post(url, data);
}

function logout() {
    let url = api + '/logout';
    return axios.get(url);
}

function deleteUser(data) {
    let url = api + '/upload/deleteuser';
    return axios.post(url, data);
}

function checkLogin() {
    let url = api + '/checkLogin';
    return axios.get(url);
}
function getloggedInUserData() {
    let url = api + '/getloggedInUserData';
    return axios.get(url);
}


function register(data) {
    let url = api + '/register';
    return axios.post(url, data);
}

function deleteFile(data) {
    let url = api + '/upload/delete';
    return axios.post(url, data);
}


function upload(data) {
    let url = api + '/upload';

    return axios
        .post(url, data, {
            onUploadProgress: ProgressEvent => {
            },
        })
        .then(res => {
            message.success("File Uploaded Successfully!")
        }).catch(err => {
            message.error("File Size must not exceed 10MB!")
            console.log(err);
            message.error("Cannot Upload Now!")
        })


}

function getTableData() {
    let url = api + '/fetchs3data';
    return axiosGet(url);
}

function getUserTableData() {
    let url = api + '/fetchallusers';
    return axiosGet(url);
}

function oAuthlogin(data) {
    let url = api + '/login/OAuth';
    return axios.post(url, data);
}

function axiosPost(url, data) {
    return axios.post(url, data)
        .then(handleSuccess)
        .catch(handleError);
}

function axiosGet(url) {
    return axios.get(url)
        .then(handleSuccess)
        .catch(handleError);
}

function handleSuccess(response) {
    return response;
}

function handleError(error) {
    if (error.response) {
        return Promise.reject(error.response);
    }
}

// manish
function checkProfile(data) {
    let url = api + '/home/enroll';
    return axios.get(url, data);
}

function enroll(data) {
    let url = api + '/home/enroll';
    return axios.post(url, data);
}
//To display current instructor schedule
function getinstructorSchedule() {
    let url = api + '/instructor/getISchedule';
    return axiosGet(url);
}

function deleteISdetails(data) {
    let url = api + '/instructor/deleteISdetails';
    return axios.post(url, data);
}
function createinstructorSchedule(data) {
    let url = api + '/instructor/createinstructorSchedule';
    return axios.post(url, data);
}
//to display available instructors to students
function getInstructorsForDates(data) {
    let url = api + '/home/plans';
    return axios.post(url, data);
}

function saveSummary(data) {
    let url = api + '/home/confirm';
    return axios.post(url, data);
}

function getAppointments() {
    let url = api + '/home/appointments';
    return axios.get(url);
}

function getUserdata(data) {
    let url = api + '/home/userdata';
    return axios.post(url,data);
}

function validateEnroll() {
    let url = api + '/home';
    return axios.get(url);
}

function getResources(){
    let url = api + '/home/resources';
    return axios.get(url);
}
function rating(data){
    let url = api + '/home/appointments';
    return axios.post(url,data);
}
function payment(data) {
    let url = api + '/payment/checkout';
    return axios.post(url, data);
}
