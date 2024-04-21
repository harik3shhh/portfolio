// const User = require("../models/user-model");
const userModel = require("../models/user-model");
const { hashPassword, comparePassword } = require("../helpers/helper")
const Message = require("../models/message-model");
const JWT = require("jsonwebtoken");


// *------------*
// REGISTRATION KA LOGIC
// *------------*


const register = async(req, res) =>{
    try {
        const {name, email, phone, password, answer } = req.body;
    if(!name){
        res.send({message: "Name is Required"});
    }

    if(!email){
        res.send({message: "Email is Required"});
    }

    if(!phone){
        res.send({message: "Phone Number is Required"});
    }

    if(!password){
        res.send({message: "Password is Required"});
    }

    if(!answer){
        res.send({message: "Answer is Required"});
    }
    
  
    //CHECK FOR EXISTING USER
    const existingUser = await userModel.findOne({email});
    if(existingUser){
        return res.status(200).send({
            success: false,
            message: "User Already Exists!!!"
        });
    }

    //hashing
    const hashedPassword = await hashPassword(password);

    //saving new user
    const user = await userModel.create({
        name, email, phone,answer, password:hashedPassword
    });

    res.status(201).send({
        success: true, 
        message: "User Registration Successfull",
        user
    });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Register",
            error
        });
    }

};


// *------------*
// LOGIN KA LOGIC
// *------------*

const login = async(req, res) => {
    try {

        //validation
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(404).send({
                success: false, 
                message: "Invalid email or password"
            });
        }

        //check if user exists or not
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success: false, 
                message: "Invalid email or password"
            });
        }

        // match password 
        const match = await comparePassword(password, user.password);
        if(!match){
            return res.status(404).send({
                success: false, 
                message: "Invalid email or password"
            });
        }

        // Generate token if logged in successfull
        const token = await JWT.sign(
            {_id: user._id},
            process.env.JWT_SECRET_KEY,
            {expiresIn: "3d",});

            console.log("Login Success");
            res.status(200).send({
            success: true,
            message: "Login Successfull",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
            token
        });

    }catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error
        });
    }
};


// *----------*
//   FORGOT PASSWORD
// *----------*

const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newpassword } = req.body;
        if (!email) {
            res.status(400).send("Email is required!!!");
        }

        if (!answer) {
            res.status(400).send("Answer is required!!!");
        }

        if (!newpassword) {
            res.status(400).send("New Password is required!!!");
        }

        // Check email and answer
        const user = await userModel.findOne({ email, answer });
        // Validation
        if (!user) {
            res.status(404).send({
                success: false,
                message: "Wrong Email or Answer"
            });
            return; // Return early to prevent further execution
        }

        const hashed = await hashPassword(newpassword)
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: "Password Reset Successful!!!"
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "something went wrong",
            error
        });
    }
};


// CONTACT
const messageMe = async(req, res) =>{
        try {
            const response = req.body;
            console.log(response);
            await Message.create(response);
            return res.status(200).json({success: true, message: "Message sent successfully!!!"});
        } catch (error) {
            return res.status(500).json({ message: "Message failed to send!!!"});
            // return res.status(500).json(extraDetails);

            // next(error);
        }
    
};





//test controller
const testController = (req, res) => {
    console.log("Procted routes");
    res.send("Protected route with token")
}



// UPDATE PROFILE CONTROLLER 
const updateProfileController = async(req, res)=>{
    try {
        const {name, email, password, phone} = req.body;
        const user = await userModel.findById(req.user._id);
        // password
        if(password && password.length < 6){
            return res.json({error: "Password is required and min 6 char"})
        }

        const hashedPassword = password ? await hashPassword(password) : undefined

        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            // address: address || user.address
        } , {new:true});

        res.status(200).send({
            success: true,
            message: "Profile Updated Successfully",
            updatedUser
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while updating profile in profile controller",
            error
        })
    }
};


// GET USER IN ADMIN PANEL
const getUser = async(req, res) =>{
    try {
        const alluser = await userModel.find({}).select("-password");
        res.status(200).send({
            success: true,
            message: "user fetched successfull",
            alluser
        })
        // console.log(alluser);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}

// DELETE USER
const deleteUser = async(req, res)=>{
    try {
        const {id} = req.params;
        await userModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "User Deleted Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false, 
            message: "Error while deleting user",
            error,

        });
    }
}

module.exports = {register, login, forgotPasswordController, testController, updateProfileController, messageMe, getUser, deleteUser};