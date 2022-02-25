// to make sure a user is logged in
// To authguard a route means to restrict it to authenticated users only
/* This function will act as a normal request callback function, checking for the existence of a session property and using res.redirect() if it's not there. If res.session.user_id does exist, it will call next(), which could potentially be another middleware function or the final function that will render the template.*/

// add withAuth to all non-GET routes to stop unauthorized users from accessing any PUT POST OR DELETE routes
const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
      res.redirect('/login'); // redirect if not auth; logged in; no session
    } else {
      next(); // call the next (anonymous) function
    }
  };
  
  module.exports = withAuth;

