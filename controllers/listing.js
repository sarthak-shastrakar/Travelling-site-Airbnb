const Listing = require("../models/listing.js");
const { cloudinary } = require("../cloudConfig.js"); // Ensure you have this config

// Show all listings
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

// New form
module.exports.rendernewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// Show single listing
module.exports.show = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

// Create new listing
module.exports.createPost = async (req, res, next) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  if (req.file) {
    newListing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  await newListing.save();
  req.flash("success", "New Listing Created");
  res.redirect("/listings");
};

// Edit form
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  let OriginalImageURL = listing.image.url?.replace("/upload", "/upload/h_200,w_250/e_blur:200");

  res.render("listings/edit.ejs", { listing, OriginalImageURL });
};

// Update listing
module.exports.updatePost = async (req, res) => {
  let { id } = req.params;
  let updatelisting = await Listing.findByIdAndUpdate(id, {
    ...req.body.listing,
  });

  if (req.file) {
    // Delete old image from Cloudinary
    if (updatelisting.image?.filename) {
      await cloudinary.uploader.destroy(updatelisting.image.filename);
    }

    // Add new image
    updatelisting.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  await updatelisting.save();
  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

// Delete listing
module.exports.deletePost = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  // Delete image from Cloudinary
  if (listing?.image?.filename) {
    await cloudinary.uploader.destroy(listing.image.filename);
  }

  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};
