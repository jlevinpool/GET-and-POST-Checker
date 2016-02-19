/* **************************************************************************
** Author: James Pool
** ONID: 932664412
** OSU Email: poolj@oregonstate.edu
** Date: 18 February 2016
**
** Program Filename: Get-and-Post-Checker.js
** Description: Week 7 Assignment - GET and POST checker. Main javascript file.
*************************************************************************** */

/* Express and Middleware */
var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = ('body-parser');

/* Handlebars Setup */
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

/* Body Parser Setup */
app.use(bodyParser.urlencoded({extended:false});
app.use(bodyParser.json());

/* Application Port */
app.set('port', 3071);

/* GET Request Handler */
app.get('/', function(req,res){
	var reqContext = {};
	reqContext.type = "GET";
	res.render('home',reqContext);
});

/* POST Request Handler */
app.post('/', function(req,res){
	var reqContext = {};
	reqContext.type = "POST";
	res.render('home',reqContext);
});


/* ERROR Handler */
app.use(function(req,res){
	res.status(404);
	res.render('404_-_Not_Found');
}

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500_-_Internal_Server_Error');
});

/* Start Application */
app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press ctrl-c to terminate.');
});