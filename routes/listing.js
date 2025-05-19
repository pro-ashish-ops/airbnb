const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapasync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const{storage} = require("../cloudConfig.js");
const upload = multer({storage});


//index route
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single("listing[image]"),validateListing,
        wrapAsync(listingController.createNew)
    );

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//show route
router.get("/:id",
    wrapAsync(listingController.show)
)

//Edit route
router.get("/:id/edit", isLoggedIn, isOwner,
    wrapAsync(listingController.renderEditForm)
)

//update route
router.put("/:id", isLoggedIn, isOwner,upload.single("listing[image]"), validateListing,
    wrapAsync(listingController.updateListing)
)

//Delete Route
router.delete("/:id", isLoggedIn, isOwner,
    wrapAsync(listingController.destroyListing)
)


module.exports = router;