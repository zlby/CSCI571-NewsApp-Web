var express = require('express');
var router = express.Router();

const ny_times_key = 'TGX7m7vFRc5qqW24NDk4WLH5nL7FmD7n';
const url_home = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=' + ny_times_key;
const url_section_prefix = 'https://api.nytimes.com/svc/topstories/v2/';
const url_section_suffix = '.json?api-key=' + ny_times_key;
let jsonObj;


router.get('/', function(req, res) {
    fetch(url_home)
        .then(res => res.text())
        .then(res => jsonObj = JSON.parse(res))
        .then(() => res.json(jsonObj))
        .catch(err => err);
    // res.json(jsonObj);
});

router.get('/:category', function (req, res) {
    const url_section = url_section_prefix + req.params.category + url_section_suffix;
    fetch(url_section)
        .then(res => res.text())
        .then(res => jsonObj = JSON.parse(res))
        .then(() => res.json(jsonObj))
        .catch(err => err);
    // res.json(jsonObj);
});

module.exports = router;