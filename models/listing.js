// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const Review = require("./review.js");

// const ListingSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: String,
//   // image: {
//   //   type: String,
//   //   default:
//   //     "https://unsplash.com/photos/a-view-of-a-city-from-a-window-in-a-building-DnU2SOszA8U",
//   //   set: (v) =>
//   //     v === ""
//   //       ? "https://unsplash.com/photos/a-view-of-a-city-from-a-window-in-a-building-DnU2SOszA8U"
//   //       : v,
//   // },
//   image: {
//     url: String,
//     filename: String,
//   },
//   price: {
//     type: Number,
//   },
//   location: {
//     type: String,
//   },
//   country: {
//     type: String,
//   },
//   reviews: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Review",
//     },
//   ],
//   owner: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//   },
// });

// // mongoose midleware for deleting reviews after deleting any list
// ListingSchema.post("findOneAndDelete", async (listing) => {
//   if (listing) {
//     await Review.deleteMany({ _id: { $in: listing.reviews } });
//   }
// });

// const Listing = mongoose.model("Listing", ListingSchema);
// module.exports = Listing;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const ListingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// Delete associated reviews on listing delete
ListingSchema.post("findOneAndDelete", async (listing) => {
  if (listing && listing.reviews.length > 0) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;
