//Here we have to define the User Collection Schema
const mongoose = require('mongoose'); //Import mongoose library
const Schema = mongoose.Schema;  // This is reference to Schema Class ~ can create new Schema instances.

//based on g2 test page - we will save the information the user input
const carInformationSchema = new Schema({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    carYear: {
        type: Number,
        required: true
    },
    plateNumber: {
        type: Number,
        required: true
    }

});


const userCollection = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    licenseNumber: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    //to nest the other cars section we have to do as below :       
    carDetails: carInformationSchema

});



//This will create a model names 'User' while using the schema defined above 'userCollection'
const User = mongoose.model('User', userCollection);
module.exports = User;