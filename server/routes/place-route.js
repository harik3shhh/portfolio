const express = require("express");
const {requireSignIn, isAdmin} = require("../middlewares/auth-middleware")
const {createProductController, getProductController, getSingleProduct, productPhotoController, deleteProductController, updateProductController, productFilterController, productCountController, productListController, searchProductController, relatedProductController, productCategoryController} = require("../controllers/place-controller");
const formidable = require("express-formidable");

const router = express.Router();

router.route("/create-place", requireSignIn, isAdmin, formidable()).post(createProductController);

router.route("/get-place").get(getProductController);

router.route("/get-place/:slug").get(getSingleProduct);

router.route("/place-photo/:pid").get(productPhotoController);


//delete product
router.delete("/delete-place/:pid", deleteProductController)

//update
router.route("/update-place/:pid", requireSignIn, isAdmin, formidable()).put(updateProductController);

// FILTER PRODUCT
router.post("/place-filters", productFilterController);

// PRODUCT COUNT
router.get("/place-count", productCountController);

// product per page
router.get("/place-list/:page", productListController);

// search product 
router.get("/search/:keyword", searchProductController);

// similar products
router.get("/related-place/:pid/:cid", relatedProductController);

// CATEGORY WISE PRODUCT 
router.get("/place-category/:slug", productCategoryController);

module.exports = router;