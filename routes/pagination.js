module.exports = function(req, res, next){
    const results = {};
    
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page-1)*limit;
    const endIndex = page*limit;


    const userReferrals = req.model;

    if (endIndex < userReferrals.length){
        results.next = {
            page: page+1,
            limit: limit
        }
    }

    if( startIndex>0 ){
        results.previous = {
            page: page-1,
            limit: limit
        }
    }

    const resultReferrals = userReferrals.slice(startIndex, endIndex); 
    results.referralData = resultReferrals;
    results.firstPage = 1;
    results.currentPage = page;
    const length = userReferrals.length;
    if (userReferrals.length%limit > 0){
        results.lastPage = Math.floor(length/limit)+1;
    }
    else results.lastPage = Math.floor(length/limit);
    req.results = results;
    next();
}