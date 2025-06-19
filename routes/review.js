const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");

const reviewcontroller = require("../controllers/reviews.js");

// post review route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewcontroller.reviewPost)
);
// step 14 : delete review function -> delete route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewcontroller.distroyReview)
);

module.exports = router;
