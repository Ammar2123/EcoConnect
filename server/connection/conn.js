const mongoose = require('mongoose');

const conn = async ()=>{
    try {
             await mongoose.connect("mongodb+srv://bharatsharma98971:htmlpp123@cluster0.r09av.mongodb.net/");
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
}

module.exports = conn;