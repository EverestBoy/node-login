const router = require('express').Router();
const User = require('../model/User');
const verify = require('./verifyJwt');
const Referral = require('../model/Referral')
const { referralValidation } = require('../validation')
const stringify = require('json-stringify-safe')


router.post('/new',verify, async (req,res) => {
    

    const {error} = referralValidation(req.body);
    
    if(error) res.status(400).send("Validation error")


    const userDetail = await User.findOne({_id: req.userVerified._id});


    if(!userDetail) res.status(400).send("User dont exist")

    const referral = new Referral({
        user_id: userDetail._id,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        course: req.body.course
    });

    try{
        const savedReferral = await referral.save();
        res.send({
            success:true,
            id: referral._id
        })
    } catch(err){
        res.status(400).send(err);
    }



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


// Editing the referral by user
router.post('/edit', verify, async(req,res) => {

    // const {error} = referralValidation(req.body);
    // if(error) res.status(400).send("Validation error")

    // const userDetail = await User.findOne({_id: req.userVerified._id});
    // if(!userDetail) res.status(400).send("User dont exist");

    // const referral = new Referral({
    //     user_id: userDetail._id,
    //     name: req.body.name,
    //     email: req.body.email,
    //     phone: req.body.phone,
    //     course: req.body.course,
    //     date: Date.now 
    // });

    id = '5e13a5cfe815bd11bede5960'
    var query = { name: 'gig bhattarai' };

    let cond = { _id: id };
    let doc = { name: 'galab' };
    try{
        const success = Referral.findById(id)
        res.send(success);
    }
    catch(err){
        console.log("Error is "+err)
        res.status(400).send(err);
    }
    
    

    // try{
    //     Referral.findOneAndUpdate({name: "gig bhattarai"},{$set:{name:"Galab Pokharel"}},{new:true});
    // //     const updateReferral = Referral.findOneAndUpdate(
    // //         {name: ""},
    // //         {$set: {"name":"galab pokharel"}},
    // //         {returnNewDocument:true});

    // //     res.send(updateReferral);
    //     res.send('hello')

    // } catch(err){
    //     res.status(400).send(err);
    // //     console.log("Error is "+err)
    // }
    res.send('hello')


});

router.post('/delete', verify, async(req,res) => {

    const {error} = referralValidation(req.body);
    if(error) res.status(400).send("Validation error")

    const userDetail = await User.findOne({_id: req.userVerified._id});
    if(!userDetail) res.status(400).send("User dont exist")


});


module.exports = router;
