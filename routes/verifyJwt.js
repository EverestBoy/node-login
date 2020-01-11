const jwt = require('jsonwebtoken');

module.exports = function (req, res, next ) {
    const token = req.header('jwt-token');
    console.log("hello is "+token);
    if(!token) return res.status(401).send(res.json({
        success: false,
        message: "Invalid Credentials. Please make sure you entered the right information and you have verified your email address."
        
    }));

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userVerified = verified;
        next();
    }
    catch(err){
        res.status(400).send('Invalid Token');
    }
}
