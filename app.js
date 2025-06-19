// // project title --> full stack project using MVC framework
// if (process.env.NODE_ENV != "production") {
//   require("dotenv").config();
// }
// var express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const listingsRouter = require("./routes/listing.js");
// const ReviewsRouter = require("./routes/review.js");
// const UserRouter = require("./routes/user.js");
// const path = require("path");
// const methodOverride = require("method-override");
// const ejsMate = require("ejs-mate");
// const ExpressError = require("./utils/ExpressError.js");
// const session = require("express-session");
// // const MongoStore = require("connect-mongo");
// const passport = require("passport");
// const LocalStrategy = require("passport-local");
// const User = require("./models/user.js");
// const flash = require("connect-flash");

// const db_url = process.env.ATLASDB_URL;

// Main()
//   .then(() => {
//     console.log("connected to mongodb");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// async function Main() {
//   await mongoose.connect(db_url);
// }

// // step 5: setting up ejs
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.urlencoded({ extended: true })); //middleware function
// app.use(methodOverride("_method"));
// app.engine("ejs", ejsMate);
// app.use(express.static(path.join(__dirname, "/public"))); //middleware function (middleware work on after the request is come and before the response is send)

// // const store = MongoStore.create({
// //   mongoURL: db_url,
// //   crypto: {
// //     secret: process.env.SECRET,
// //   },
// //   touchAfter: 24 * 3600,
// // });
// // store.on("error", () => {
// //   console.log("ERROR IN MONGOSESSION STORE", error);
// // });

// const sessionOptions = {
//   // store,
//   secret: process.env.SECRET,
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     express: Date.now() + 7 * 24 * 60 * 60 * 1000,
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//     httpOnly: true,
//   },
// };

// // passport session
// // "pbkdf2" hassing algorithm used
// app.use(session(sessionOptions));
// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// // flash function
// app.use((req, res, next) => {
//   res.locals.success = req.flash("success");
//   res.locals.error = req.flash("error");
//   res.locals.currUser = req.user;
//   next();
// });

// app.use("/listings", listingsRouter);
// app.use("/listings/:id/reviews", ReviewsRouter);
// app.use("/", UserRouter);

// app.all("*", (req, res, next) => {
//   next(new ExpressError(404, "Page Not Found!!"));
// });
// app.use((err, req, res, next) => {
//   let { statusCode = 500, message = "something went wrong" } = err;
//   res.status(statusCode).render("listings/error.ejs", { err });
//   next();
// });

// // step 1: connecting our server with port
// const PORT = 8084;
// app.listen(PORT, (res, req) => {
//   console.log(`Server is running on port ${PORT}`);
// });



// project title --> full stack project using MVC framework
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
var express = require("express");
const app = express();
const mongoose = require("mongoose");
const listingsRouter = require("./routes/listing.js");
const ReviewsRouter = require("./routes/review.js");
const UserRouter = require("./routes/user.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
// const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const flash = require("connect-flash");

const db_url = process.env.ATLASDB_URL;

Main()
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });
async function Main() {
  await mongoose.connect(db_url);
}

// step 5: setting up ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true })); //middleware function
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public"))); //middleware function (middleware work on after the request is come and before the response is send)

// const store = MongoStore.create({
//   mongoURL: db_url,
//   crypto: {
//     secret: process.env.SECRET,
//   },
//   touchAfter: 24 * 3600,
// });
// store.on("error", () => {
//   console.log("ERROR IN MONGOSESSION STORE", error);
// });

const sessionOptions = {
  // store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    express: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// passport session
// "pbkdf2" hassing algorithm used
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// flash function
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", ReviewsRouter);
app.use("/", UserRouter);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!!"));
});
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong" } = err;
  res.status(statusCode).render("listings/error.ejs", { err });
  next();
});

// step 1: connecting our server with port
const PORT = 8084;
app.listen(PORT, (res, req) => {
  console.log(`Server is running on port ${PORT}`);
});
