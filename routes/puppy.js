var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/puppy');
var puppyCollection = db.get('pupsinfo');
var validation = require('../lib/server.js');

router.get('/puppy/new', function (req, res, next){
  res.render('puppy/new');
})

router.get('/puppy/index', function (req, res, next) {
  puppyCollection.find({}, function (err, data) {
  res.render('puppy/index', {puppyinfo: data});
  })
})

router.post('/puppy/new', function (req, res, next){
  var pupName = req.body.pupname;
  var pupId = req.body.pupid;
  var puppyObj = {puppy: req.body};
  var errorCheck = validation.validate(pupName, pupId, puppyObj);
  console.log(errorCheck);
  if (errorCheck.length > 0){
    res.render('puppy/new', {errors: errorCheck})
  }
  else {
  puppyCollection.insert({puppyname: req.body.pupname, pupid: req.body.pupid})
  res.redirect('/puppy/index');
  }
})


module.exports = router;
  // if (req.body.pupname === "" || req.body.pupname === undefined || req.body.pupname === null){
  //   res.render('puppy/new', {response: 'Your dog has no name!'})
  // }
  // else if (req.body.pupname.match(/[0-9]/i)){
  //   res.render('puppy/new', {say: 'You cannot have numbers in name'})
  // }
  // else if (req.body.pupname.match(/\s/i) || req.body.pupid.match(/\s/i)){
  //   res.render('puppy/new', {now: 'No spaces allowed'})
  // }
  // // else if (req.body.pupid === '' || req.body.pupid === undefined || req.body.pupid === null){
  // //   res.render('puppy/new', {fix: 'You need a pup ID'})
  // // }
  // else if (req.body.pupid.length < 3){
  //   res.render('puppy/new', {length: 'ID needs to be three characters long'})
  // }
  // else if (req.body.pupid === NaN){
  //   res.render('puppy/new', {put: 'Puppy ID needs to be numbers'})
  // }
