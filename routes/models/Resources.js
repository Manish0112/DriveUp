const mongoose=require('mongoose');

const ResourceSchema=new mongoose.Schema({
    index: {
        type: String,
        required: false
    },
    desc: {
        type: String,
        required: false
    },
    file: {
        type: String,
        required: false
    },
    videoId: {
        type: String,
        required: true
    },
    tags : {
        type: Array,
        required: false
    }
});

const Resource=mongoose.model('Resources',ResourceSchema);

module.exports = Resource;