const router = require('express').Router();
const User = require('../model/User');
const Referral = require('../model/Referral')
const verify = require('./verifyJwt')

router.get('/',verify, async (req,res) => {
    // res.json({
    //     posts:{
    //         title: "test title",
    //         description: "you cannot access this data"
    //     }
    // });
    const userDetail = await  Referral.find({used_id: req.userId});
    res.json({
        success: true,
        data: {
            userDetail
        }
    });
});


module.exports = router;
