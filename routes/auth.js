const router = require('express').Router();
const User = require('../model/User');
const Device = require('../model/Device');
const {registerValidation} = require('../validation');
const { loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('./verifytoken');





// REGISTER
router.post('/register', async(req,res) => {

    // Validating the request with model
    const {error} = registerValidation(req.body);

    if(error) res.status(400).send(error.details[0].message);


    // Check if user is already in database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');


    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        phone: req.body.phone,
        image: req.body.image
    });
    try{
        const savedUser = await user.save();
        res.send({user: user._id})
    } catch(err){
        res.status(400).send(err);
    }
});

// Register device id
router.post('/registerDevice', async(req, res) => {
    const device = new Device({
        deviceId: req.body.deviceId,
        userId: req.body.userId
    });
    try{
        const savedDevice = await device.save();
        res.send({device: device._id})
    }
    catch(err){
        res.status(400).send(err);
    }
});


// LOGIN WITH EMAIL PASSWORD
router.post('/login', async(req,res) => {
    

    // Validating the request with model
    const {error} = loginValidation(req.body);
    if(error) res.status(400).send(error.details[0].message);


    // Checking if email exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email or password is wrong');

    // Checking if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) res.status(400).send("Password is wrong");


    // Create and assign an token
    const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
})

// LOGIN WITH TOKEN
router.get('/tokenLogin', verify, async(req,res) => {
    const userDetail = await  User.findOne({_id: req.userVerified._id});
    res.json({
        success: true,
        user: {
            name: userDetail.name,
            email: userDetail.email,
            phone: userDetail.phone,
            image: userDetail.image
        }
    });
});




module.exports = router;