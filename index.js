//Alphin Tom - Installation of express, node creation, and testing if linkage is proper
//Rushang Panchal - Foundation of express and and pathing seen in index.js
//Shakila Samaradiwakara - Setup EJS files and layout design


//The below is all done through terminal
// ~ To create Node.js project and initialize it ~ it will have package.json file with required settings
// RUN ~ npm init ~ into assignment 1 folder

//Install Express framework with below code
//npm install express

// Next create the main file
//RUN touch index.js

//Next inside this index.js file we will setup Express to route the mentioned sections
const express = require('express'); // imports Express module
const path = require('path'); // imports path module which helps with file & directory paths.
const eApp = express(); // creates an Express application under the eApp Object
const port = 3000; // common line used to setup the port number ~ we need this for incoming requests
const mongoose = require('mongoose'); //Import mongoose library
const User = require('./models/User'); //Import User Model - can interact with user collection made in mongoDB


// *MIDDLEWARE SETUP* --- we will use urlencoded to parse the forms submitted via HTTP POST  - the data parsed will be in req.body which we will use below ( for OBJECT user)
eApp.use(express.urlencoded({ extended: true })) //we need to use extended: true as it uses 'qs' library which helps handle nested objects (user information also has car details when submitting form)


//we will save the connection string to our database to URI variable
const URI = 'mongodb+srv://shakilamr124:node123@assignment2.a1fjcbl.mongodb.net/?retryWrites=true&w=majority&appName=Assignment2';
mongoose.connect(URI)
    .then(result =>
        eApp.listen(port, () => {
            console.log(`We are running port: ${port}`); //This will start the server and listen to connections from port 3000
        }))
    .catch(err => console.log("i guess its not running"));





//make Express use EJS files to render the view
eApp.set('view engine', 'ejs');
eApp.set('views', path.join(__dirname, 'views/pages')) //this sets the directory for view then pages directory

//The below code is used for serving static files - Whenever incoming request is made - the callback will run!
eApp.use(express.static(path.join(__dirname, 'assets'))); //path.join(_dirname, 'public') = /Users/shakila/Canada/Assignment1/assets


//Setting up Routes
// .get will listen to GET REQUEST to root URL ('/') ~ callback will execute if route matched
eApp.get('/', (req, res) => {
    res.render('index', { title: 'Home Page' });
});

// Login
eApp.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page' });
})

// Dashboard
eApp.get('/dashboard', (req, res) => {
    res.render('dashboard', { title: 'dashboard Page' });
})

// G Page
eApp.get('/G', (req, res) => {
    const licenseNumber = req.query.licenseNumber;

    if (licenseNumber) {
        // Validate licenseNumber before querying the database
        if (!/^\d+$/.test(licenseNumber)) {
            return res.render('g', { title: 'G Page', message: 'License should be numeric', goToG2: false, user: null });
        }
        User.findOne({ licenseNumber: licenseNumber })
            .then(user => {
                if (user) {
                    // User found, render page with user data
                    res.render('g', { title: 'G Page', user: user, message: null, goToG2: false });
                } else {
                    // No user found, render page with message and option to go to G2 page
                    res.render('g', { title: 'G Page', message: 'No User Found', goToG2: true, user: null });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).send('Internal Server Error')
            });
    }
    else {
        // Render the page without any user information
        res.render('g', { title: 'G Page', user: null, message: null, goToG2: false });
    }
});


// G Page - POST method for updating car information
eApp.post('/g', (req, res) => {
    const licenseNumber = req.body.licenseNumber;
    const make = req.body.make;
    const model = req.body.model;
    const carYear = req.body.carYear;
    const plateNumber = req.body.plateNumber;

    if (!licenseNumber.match(/^\d+$/) || !make.match(/^[A-Za-z\s]{1,50}$/) || !model.match(/^[A-Za-z\s]{1,50}$/) || !carYear.match(/^\d{4}$/) || !plateNumber.match(/^\w+$/)) {
        return res.render('g', { title: 'G Page', message: 'Invalid input', goToG2: false, user: null });
    }

    User.findOne({ licenseNumber: licenseNumber })
        .then(user => {
            if (user) {
                user.carDetails.make = req.body.make;
                user.carDetails.model = req.body.model;
                user.carDetails.carYear = req.body.carYear;
                user.carDetails.plateNumber = req.body.plateNumber;

                return user.save();
            } else {
                // No user found, render with message and option to go to G2 page
                res.render('g', { title: 'G Page', message: 'No User Found', goToG2: true });
            }
        })
        .then(savedUser => {
            if (savedUser) {
                res.render('g', { title: 'G Page', user: savedUser, message: 'Updated successfully', goToG2: false });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});


// G2 Page
eApp.get('/G2', (req, res) => {
    res.render('g2', { title: 'G2 Page', message: null });
})


//G2 Whenever a post is made - the below will handle the form submission
eApp.post('/g2', (req, res) => {


    console.log(req.body); // Log the request body to check the incoming data

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        licenseNumber: req.body.licenseNumber,
        age: req.body.age,
        dob: req.body.dob,
        carDetails: {
            make: req.body.make,
            model: req.body.model,
            carYear: req.body.carYear,
            plateNumber: req.body.plateNumber
        }
    });

    user.save()
        .then(result => {
            //res.redirect('/g2');
            res.render('g2', { title: 'G2 Page', message: 'Updated New Client' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });

});