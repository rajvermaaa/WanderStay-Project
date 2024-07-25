const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn , isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage }); 

//New Route
router.get("/new",isLoggedIn ,listingController.renderNewForm); 

router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing));
   

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn ,isOwner,upload.single('listing[image]'),  wrapAsync(listingController.updateListing))
    .delete(isLoggedIn ,isOwner,  wrapAsync(listingController.destroyListing));


//Index Route
// router.get("/", wrapAsync(listingController.index));

//New Route 



//Show route
// router.get("/:id", wrapAsync(listingController.showListing)); 

//Create Route
// router.post(
//     "/", 
//     isLoggedIn ,validateListing,
//     wrapAsync(listingController.createListing)
// );

//Edit Route
router.get("/:id/edit",isLoggedIn ,isOwner, wrapAsync(listingController.renderEditForm));

//Update Route
// router.put("/:id",isLoggedIn ,isOwner,  wrapAsync(listingController.updateListing)); 

//Delete Route
// router.delete("/:id",isLoggedIn ,isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;  