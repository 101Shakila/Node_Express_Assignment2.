//Here we have to define the User Collection Schema
const mongoose = require('mongoose'); //Import mongoose library
const Schema = mongoose.Schema;  // This is reference to Schema Class ~ can create new Schema instances.

//based on g2 test page - we will save the information the user input
const userCollection = new Schema({
    firstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    licenseNumber: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    //to nest the other cars section we have to do as below :

    car_details: carInformationSchema

});


const carInformationSchema = new Schema({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    plateNumber: {
        type: Number,
        required: true
    },

});

//This will create a model names 'User' while using the schema defined above 'userCollection'
const UserCol = mongoose.model('UserCol', userCollection);
module.exports = UserCol;