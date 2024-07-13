//Assignment 1
//Alphin Tom - Installation of express, node creation, and testing if linkage is proper
//Rushang Panchal - Foundation of express and and pathing seen in index.js
//Shakila Samaradiwakara - Setup EJS files and layout design

//Assignment 2
//Alphin Tom - setup Datbase connection in index.js and made it connection works for both g and g2
//Rushang Panchal - fixed g2 file for gathering new data to input into database
//Shakila Samaradiwakara - Setup Users.js and g.ejs file ( for post and get )

//Assignment 3
// MVC - Model View Controller - Seperate the application logic into three interconnected components.
//Alphin Tom - Checked and updated index.js page, tested encryption via database & validation throughout application.
//Rushang Panchal - Setup the conditions on the pages for the data being transfered
//Shakila Samaradiwakara - Setup the MCV pattern & encryption - Which includes the controllers, middlewear, routes and models.

//How to Run notes below!!!

//The below is all done through terminal
// ~ To create Node.js project and initialize it ~ it will have package.json file with required settings
// RUN ~ npm init ~ into assignment 1 folder
//Install Express framework with below code
//npm install express
// Next create the main file
//RUN touch index.js
//npm install bcrypt - This library is used for encryption ( HASH ).

//Next inside this index.js file we will setup Express to route the mentioned sections
const express = require('express'); // imports Express module
const path = require('path'); // imports path module which helps with file & directory paths.
const eApp = express(); // creates an Express application under the eApp Object
const port = 3000; // common line used to setup the port number ~ we need this for incoming requests
const mongoose = require('mongoose'); //Import mongoose library
const session = require('express-session'); //npm install express-session
const MongoStore = require('connect-mongo'); //npm install connect-mongo
const authRoutes = require('./routes/authRoutes'); //Import the routes we have setup in the routes folder
const userRoutes = require('./routes/userRoutes'); //Import the routes we have setup in the routes folder




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

//Session is being used to manage user authentication based on the credentials stored in MongoDB - 
eApp.use(session({
    secret: 'shakila123', // Replace with your own secret key
    resave: false, //Placing it false just means that we will only save the session IF we save
    saveUninitialized: false, //Ensures that a session is not saved to the store unless it has been modified
    store: MongoStore.create({ mongoUrl: URI }), //Session store thats used for MongoDB
    cookie: { secure: false } // Set to true if using https
}));




//make Express use EJS files to render the view
eApp.set('view engine', 'ejs');
eApp.set('views', path.join(__dirname, 'views/pages')) //this sets the directory for view then pages directory

//The below code is used for serving static files - Whenever incoming request is made - the callback will run!
eApp.use(express.static(path.join(__dirname, 'assets'))); //path.join(_dirname, 'public') = /Users/shakila/Canada/Assignment1/assets


//Routes - We are basically telling express that to use these routes whenever we start a root path with '/'
eApp.use('/', authRoutes);
eApp.use('/', userRoutes);


//Setting up Routes
// .get will listen to GET REQUEST to root URL ('/') ~ callback will execute if route matched
eApp.get('/', (req, res) => {
    res.render('index', { title: 'Home Page', loggedIn: false });
});

