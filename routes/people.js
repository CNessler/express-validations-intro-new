var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/people');
var peopleCollection = db.get('peopleinfo');
var validator = require('../lib/server.js');


router.get('/people/new', function (req, res, next) {
  res.render('people/new');
})

router.get('/people/index', function (req, res, next) {
  peopleCollection.find({}, function (err, data) {
  res.render('people/index', {humans: data})
  })
})

router.post('/people/new', function (req, res, next) {
  var humanName = req.body.human;
  var hobby = req.body.hobby;
  var peopleObj = {people: req.body};
  var errorCheck = validator(humanName, hobby, peopleObj);
  if (errorCheck.length > 0){
    res.render('people/new', {errors: errorCheck});
    // console.log(errors);
  }
  else {
  peopleCollection.insert({humanname: req.body.human, freetime: req.body.hobby})
  res.redirect('/people/index');
  }
})
module.exports = router;


  // if(req.body.human === ""){
  //   res.render('people/new', {response: 'Fill in your name NOW!'})
  // }
  // else if(req.body.human.match(/[0-9]/i) || req.body.hobby.match(/[0-9]/i)){
  //   res.render('people/new', {say: 'You cannot have numbers in inputs'})
  // }
  // else if(req.body.human.match(/\s/i) || req.body.hobby.match(/\s/i)){
  //   res.render('people/new', {now: 'No spaces in input'})
  // }
  // else if (req.body.hobby === "" || req.body.hobby === undefined || req.body.hobby === null){
  //   res.render('people/new', {fix: 'You have no hobby?'})
  // }
