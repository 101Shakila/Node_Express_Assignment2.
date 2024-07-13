const User = require('../models/User');//Import User Model - can interact with user collection made in mongoDB
const bcrypt = require('bcrypt');//Import bcrypt Library into our app - Helps hash passwords


//This basically renders the g2 BUT we gonna do it based on IF user is logged in or not - Coming from the authRoutes.js router
exports.loginPage = (req, res) => {
    const username = req.session.user ? req.session.user.username : null;

    //if user exists during the session -  we will have use logged in as TRUE which will allow the user to see LOGOUT option ( condition is set on layout.ejs)
    if (username) {
        res.render('login', { title: 'Login Page', message: '', loggedIn: true });
    }
    else {
        res.render('login', { title: 'Login Page', message: '', loggedIn: false });

    }
};

//This is where we will get the username and password and validate them
//using findOne we will check the database for the username and if found will render the dashboard
//if not found we will render the login page with an error message
exports.login = async (req, res) => {
    try {

        const username = req.body.username;
        const password = req.body.password;


        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).render('login', { title: 'Login Page', message: 'Try Signing Up first!', loggedIn: false });
        }
        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) {
            return res.status(400).render('login', { title: 'Login Page', message: 'Invalid Password', loggedIn: false });
        }

        // We are using sessions for authentication - this will allow it to show G and G2
        // Storing user in session
        // Storing user information in session
        req.session.user = {
            username: user.username,
            userType: user.userType,
        };
        //We will make sure to capture the userType so we can know what options to present when logged in
        const userType = req.session.user.userType;
        res.render('dashboard', { title: 'Dashboard Page', userType, loggedIn: true });

    } catch (error) {
        res.status(500).send("Internal Error at login!");
    }
};

//User registration
exports.signup = async (req, res) => {


    //we will capture all the users inputs and then follow through with some validation
    try {

        const username = req.body.username;
        const password = req.body.password;
        const repeatPassword = req.body.repeatPassword;
        const userType = req.body.userType;


        const defaultDob = new Date('2000-01-01'); // Default Date of Birth

        //first we will check if the password and repeated password is the same
        if (password !== repeatPassword) {
            res.render('login', { title: 'Login Page', message: 'Password does not MATCH!', loggedIn: false });
        }
        //then we will check if the username already exists
        const user = await User.findOne({ username: username });
        if (user) {
            res.render('login', { title: 'Login Page', message: 'Username already EXISTS', loggedIn: false });
        }
        //we use save() to save a new document ( user in this case ) to the MongoDB database
        const userAdd = new User({
            username: username,
            password: password,
            userType: userType,
            firstName: req.body.firstName || 'First Name',
            lastName: req.body.lastName || 'Last Name',
            licenseNumber: req.body.licenseNumber || 'Unknown',
            age: req.body.age || 18,
            dob: req.body.dob || defaultDob,
            carDetails: {
                make: req.body.make || 'Make',
                model: req.body.model || 'Model',
                carYear: req.body.carYear || new Date().getFullYear(),
                plateNumber: req.body.plateNumber || 'Plate Number'
            }
        });

        //Here we will save the user details into the database with save() functionality.
        await userAdd.save();
        res.render('login', { title: 'Login Page', message: 'SignUp Successful', loggedIn: false });
    }
    catch (error) {
        res.render('login', { title: 'Login Page', message: '', loggedIn: false });
    }


};

