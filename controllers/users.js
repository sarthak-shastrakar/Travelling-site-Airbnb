const User = require("../models/user.js");

// signup form render route
module.exports.rendersignupForm = async (req, res) => {
  res.render("users/signup.ejs");
};

//   signup route controller
module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (error) => {
      if (error) {
        return next(error);
      }
      req.flash("success", "Welcome to the Journey!");
      res.redirect("/listings");
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/signup");
  }
};

// login form route
module.exports.renderLoginForm = async (req, res) => {
  res.render("users/login.ejs");
};

// login route
module.exports.login = async (req, res) => {
  req.flash("success", "Welcome to the Journey");
  let redirectUrl = req.session.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

// logout route
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you are logout !");
    res.redirect("/listings");
  });
};





