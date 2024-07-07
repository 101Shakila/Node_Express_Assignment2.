//Here we have to define the User Collection Schema
const mongoose = require('mongoose'); //Import mongoose library
const Schema = mongoose.Schema;  // This is reference to Schema Class ~ can create new Schema instances.
const bcrypt = require('bcrypt'); //Import bcrypt Library into our app - Helps hash passwords

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
        type: String, //Converted into string for flexibility.
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
        type: String, //When it comes to HASHING - we need it to be string because hash function output is STRING.
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

//To improve security - we will ENCRYPT the license number before saving it into the system.
//middleware refers to functions that run during the lifecycle of a request to a server, but before the final request handler.
//Below will be treated as a pre-save middlewear for userCollection 
userCollection.pre('save', async function (callback) { //async makes the function asynchronous

    try {
        if (this.isModified('licenseNumber')) { // We need to check if licenseNumber has been modified and AVOID re-hashing it.
            const salt = await bcrypt.genSalt(10); //genSalt adds randomness to the encryption making it harder to hack. - await is used here to make sure to wait for async hash to complete.
            this.licenseNumber = await bcrypt.hash(this.licenseNumber, salt);
        }
        callback(); //callback is needed here to make sure the middleware stack continues and saves the data in the database.
    } catch (error) {
        callback(error);
    }
});





//This will create a model names 'User' while using the schema defined above 'userCollection'
const User = mongoose.model('User', userCollection);
module.exports = User;