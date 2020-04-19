var express = require('express');
var router = express.Router();

const ny_times_key = 'TGX7m7vFRc5qqW24NDk4WLH5nL7FmD7n';
const url_home = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=' + ny_times_key;
const url_section_prefix = 'https://api.nytimes.com/svc/topstories/v2/';
const url_section_suffix = '.json?api-key=' + ny_times_key;
const url_detail_prefix = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:("';
const url_search_prefix = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=';
const url_search_suffix = '&api-key=' + ny_times_key;
const url_detail_suffix = '")&api-key=' + ny_times_key;
let jsonObj;


router.get('/', function(req, res) {
    jsonObj = {};
    fetch(url_home)
        .then(res => res.text())
        .then(res => jsonObj = JSON.parse(res))
        .then(() => res.json(jsonObj))
        .catch(err => err);
});

router.get('/:category', function (req, res) {
    jsonObj = {};
    const url_section = url_section_prefix + req.params.category + url_section_suffix;
    fetch(url_section)
        .then(res => res.text())
        .then(res => jsonObj = JSON.parse(res))
        .then(() => res.json(jsonObj))
        .catch(err => err);
});


router.get('/search/:skey', function (req, res) {
    jsonObj = {};
    const url_search = url_search_prefix + req.params.skey + url_search_suffix;
    fetch(url_search)
        .then(res => res.text())
        .then(res => jsonObj = JSON.parse(res))
        .then(() => res.json(jsonObj))
        .catch(err => err);
});


router.get('/detailed/:sid(*)', function (req, res) {
    jsonObj = {};
    const url_detail = url_detail_prefix + req.params.sid + url_detail_suffix;
    fetch(url_detail)
        .then(res => res.text())
        .then(res => jsonObj = JSON.parse(res))
        .then(() => res.json(jsonObj))
        .catch(err => err);
});

module.exports = router;