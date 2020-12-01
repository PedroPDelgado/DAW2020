var express = require('express');
var router = express.Router();
var studentUtil = require('../utils/studentUtils.js')

var Student = require('../controllers/student')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/students', function(req, res) {
  // Data retrieve
  Student.list()
    .then(data => res.render('students', { list: data }))
    .catch(err => res.render('error', {error: err}))
  ;
});

// tem de estar em cima de students/:id porque senao ele vai tentar ler "register" como um id de um aluno
router.get('/students/register', function(req, res) {
  // Data retrieve
  res.render('studentForm')
});


router.get('/students/tpc/:id', function(req, res) {
  // Data retrieve
  Student.lookUp(req.params.id)
  	.then(data => res.render('studentTpcView', {student : data}))
  	.catch(err => res.render('error', {error: err}))
});

router.get('/students/delete/:id', function(req, res) {
  // Data retrieve
  Student.remove(req.params.id)
    .then(data => res.render('studentDeletedView', { id: req.params.id }))
    .catch(err => res.render('error', {error: err}))
  ;
});


router.get('/students/:id', function(req, res) {
  // Data retrieve

  Student.lookUp(req.params.id)
    .then(data => {
    	tpc_string = studentUtil.tpcString(data.tpc)
    	res.render('studentView', { student: data, tpc: tpc_string })
	})
    .catch(err => res.render('error', {error: err}))
  ;
});



router.get('/students/edit/:id', function(req, res) {
  // Data retrieve
  Student.lookUp(req.params.id)
    .then(data => res.render('studentFormEdit', { student: data }))
    .catch(err => res.render('error', {error: err}))
  ;
});

router.post('/students', function(req, res) {
	// Save student to db
	Student.insert(req.body)
		.then(data => res.render('studentRegistConfirm', { student: data, isNew: true}))
		.catch(err => res.render('error', {error: err}))
});

router.post('/students/:id', function(req, res) {
	// Update student
	std = studentUtil.parseTpc(req.body)
	Student.update({id: req.params.id, student: std})
		.then(data => res.render('studentRegistConfirm', { student: std, isNew: false}))
		.catch(err => res.render('error', {error: err}))
});



module.exports = router;
