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
//changes



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

// Dashboard
eApp.get('/dashboard', (req, res) => {
    res.render('dashboard', { title: 'dashboard Page' });
})


// G Page
eApp.get('/G', (req, res) => {
    res.render('g', { title: 'G Page' });
})

// G2 Page
eApp.get('/G2', (req, res) => {
    res.render('g2', { title: 'G2 Page' });
})


// Login
eApp.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page' });
})


//This will start the server and listen to connections from port 3000
eApp.listen(port, () => {
    console.log(`We are running port: ${port}`);
})

//Assignment 2 - We will first Download MongoDB & Connect it. ( npm i mongoose )
//