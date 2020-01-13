const Referral = require('../../model/Referral');

module.exports =async function(req, res, next){
    const userReferrals = await Referral.find({user_id: req.userId}).select('name email phone course');
    req.model = userReferrals;
    next();
}