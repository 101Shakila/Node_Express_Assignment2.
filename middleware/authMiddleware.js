const authMiddleware = (req, res, next) => {
    if (req.session && req.session.user) {
        next(); // User is authenticated, allow access
    } else if (req.originalUrl === '/dashboard') {
        res.render('dashboard', { title: 'dashboard Page', loggedIn: false });

    } else if (req.originalUrl === '/login') {
        res.render('login', { title: 'Login Page', message: '', loggedIn: false });
    } else {

        // User is not authenticated and trying to access a protected route
        res.render('login', { title: 'Login Page', message: 'wait a minute', loggedIn: false });
    }
};



//This export is required so that the functionality can be used by other files ( require ...    )
module.exports = authMiddleware;
