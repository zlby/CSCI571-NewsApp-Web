var express = require('express');
var router = express.Router();

const url_home = 'https://content.guardianapis.com/search?api-key=XXXXXXXXXXXXXXXX&section=(sport|business|technology|politics)&show-blocks=all';
const url_section_prefix = 'https://content.guardianapis.com/';
const url_section_suffix = '?api-key=XXXXXXXXXXXX&show-blocks=all';
const url_search_prefix = 'https://content.guardianapis.com/search?q=';
const url_search_suffix = '&api-key=XXXXXXXXXXXXXXXX&show-blocks=all';
const url_newest = 'https://content.guardianapis.com/search?order-by=newest&show-fields=starRating,headline,thumbnail,short-url&api-key=XXXXXXXXXXXX';
let jsonObj;



router.get('/', function(req, res) {
    jsonObj = {};
    fetch(url_home)
        .then(res => res.text())
        .then(res => jsonObj = JSON.parse(res))
        .then(() => res.json(jsonObj))
        .catch(err => err);
    // res.json(jsonObj);
});

router.get('/:category', function (req, res) {
    jsonObj = {};
    const ca = req.params.category === 'sports' ? 'sport' : req.params.category;
    const url_section = url_section_prefix + ca + url_section_suffix;
    fetch(url_section)
        .then(res => res.text())
        .then(res => jsonObj = JSON.parse(res))
        .then(() => res.json(jsonObj))
        .catch(err => err);
});

router.get('/search/:skeyword', function (req, res) {
    jsonObj = {};
    const url_search = url_search_prefix + req.params.skeyword + url_search_suffix;
    fetch(url_search)
        .then(res => res.text())
        .then(res => jsonObj = JSON.parse(res))
        .then(() => res.json(jsonObj))
        .catch(err => err);
});

router.get('/detailed/:sid(*)', function(req, res) {
    jsonObj = {};
    const url_detail = url_section_prefix + req.params.sid + url_section_suffix;
    fetch(url_detail)
        .then(res => res.text())
        .then(res => jsonObj = JSON.parse(res))
        .then(() => res.json(jsonObj))
        .catch(err => err);
});

router.get('/newest/top', function(req, res) {
    jsonObj = {};
    const url_detail = url_newest;
    fetch(url_detail)
        .then(res => res.text())
        .then(res => jsonObj = JSON.parse(res))
        .then(() => res.json(jsonObj))
        .catch(err => err);
});

module.exports = router;
