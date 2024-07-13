const express = require('express');
const router = express.Router(); //Creates new router object - Helps with 
const authController = require('../controllers/authController'); // Imports authenticator module

router.get('/login', authController.loginPage);
router.post('/login', authController.login);
router.post('/signup', authController.signup);


// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/login');
        }
        res.redirect('/');
    });
})

module.exports = router;
