// const express = require("express");
// const router = express.Router();
// const wrapAsync = require("../utils/wrapAsync.js");
// const { listingSchema } = require("../schema.js");
// const ExpressError = require("../utils/ExpressError.js");
// const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
// const listingController = require("../controllers/listing.js");
// const multer = require("multer"); // multipart urlencoded package
// const { storage } = require("../cloudConfig.js");
// const upload = multer({ storage });

// // good way to define our Router function
// router
//   .route("/")
//   .get(wrapAsync(listingController.index))
//   .post(
//     isLoggedIn,
//     upload.single("listing[image]"),
//     validateListing,
//     wrapAsync(listingController.createPost)
//   );

// // step 7 : new route / create new listing
// router.get("/new", isLoggedIn, listingController.rendernewForm);
// router
//   .route("/:id")
//   .get(wrapAsync(listingController.show))
//   .put(
//     isLoggedIn,
//     isOwner,
//     upload.single("listing[image]"),
//     validateListing,
//     wrapAsync(listingController.updatePost)
//   )
//   .delete(isLoggedIn, isOwner, wrapAsync(listingController.deletePost));

// // step 9 : edit route
// router.get(
//   "/:id/edit",
//   isLoggedIn,
//   isOwner,
//   wrapAsync(listingController.renderEditForm)
// );

// module.exports = router;
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("image"), // ✅ fixed field name
    validateListing,
    wrapAsync(listingController.createPost)
  );

router.get("/new", isLoggedIn, listingController.rendernewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.show))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("image"), // ✅ fixed field name
    validateListing,
    wrapAsync(listingController.updatePost)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deletePost));

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
