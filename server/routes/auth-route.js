const express = require("express");
const {register, login,forgotPasswordController, testController, updateProfileController, messageMe, getUser, deleteUser} = require("../controllers/auth-controller");
const {requireSignIn, isAdmin} = require("../middlewares/auth-middleware");


const router = express.Router();


router.route("/register").post(register);

router.route("/login").post(login);

// FORGOT PASSWORD
router.post("/forgot-password", forgotPasswordController)

// contact page 
router.route('/message').post(messageMe);


// testing protected routes
router.route("/test").get(requireSignIn, isAdmin, testController);

// dashboard route
router.get("/user-auth", requireSignIn, (req, res)=>{
    res.status(200).send({ok: true});
});

//admin dashboard
router.get("/admin-auth", requireSignIn,isAdmin, (req, res)=>{
    res.status(200).send({ok: true});
});

// UPDATE PROFILE
router.put("/profile", requireSignIn, updateProfileController)

// GET ALL USER
router.get("/alluser", requireSignIn, getUser);

router.delete("/delete-user/:id", requireSignIn, isAdmin, deleteUser);

module.exports = router;