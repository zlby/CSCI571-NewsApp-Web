var express = require('express');
var router = express.Router();
const starttime = new Date('2019-06-01');
let jsonObj;

router.get('/:skey', function(req, res, next) {
    jsonObj = {};
    const keyword = req.params.skey;
    googleTrends.interestOverTime({keyword: keyword, startTime: starttime})
        .then(result => {
            res.json(JSON.parse(result));
        })
        .catch(err => err);

});

module.exports = router;