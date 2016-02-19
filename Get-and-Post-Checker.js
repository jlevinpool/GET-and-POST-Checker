/* **************************************************************************
** Author: James Pool
** ONID: 932664412
** OSU Email: poolj@oregonstate.edu
** Date: 18 February 2016
**
** Program Filename: Get-and-Post-Checker.js
** Description: Week 7 Assignment - GET and POST checker. Main javascript file.
**
** Code for processing GET and POST requests are modified from CS 290 lecture:
** http://eecs.oregonstate.edu/ecampus-video/CS290/core-content/hello-node/express-forms.html
*************************************************************************** */

/* Express and Middleware */
var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

/* Handlebars Setup */
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

/* Body Parser Setup */
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/* Application Port */
app.set('port', 3000);

/* Query Request Handing Function */
function queryRequest(query){
	/* Process Request Modified from CS 290 Lecture 
	   http://eecs.oregonstate.edu/ecampus-video/CS290/core-content/hello-node/express-forms.html */
	var qParams = [];
	for (var p in query){  /* Loop through request query */
		qParams.push({'name':p,'value':query[p]})
	}
	return qParams;  /* Add requrest to context object */
	//return context;
}

/* Body Request Handling Function */
function bodyRequest(body){
	/* Process Request Modified from CS 290 Lecture 
	   http://eecs.oregonstate.edu/ecampus-video/CS290/core-content/hello-node/express-forms.html */
	var qParams = [];
	for (var p in body){  /* Loop through request body */
		qParams.push({'name':p,'value':body[p]})
	}
	return qParams;  /* Add requrest to context object */
}

/* Home Catcher */
app.get('/', function(req,res){
	res.render('home');
});

/* GET Request Handler */
app.get('/checker', function(req,res){
	var context = {};
	context.type = "GET";
	context.queryRequest = queryRequest(req.query);
	res.render('checker', context);
});

/* POST Request Handler */
app.post('/checker', function(req,res){
  	var context = {};
	context.type = "POST";
	context.queryRequest = queryRequest(req.query);
	context.bodyRequest = bodyRequest(req.body);
	res.render('checker', context);
});

/* ERROR Handler */
app.use(function(req,res){
	res.status(404);
	res.render('404_-_Not_Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500_-_Internal_Server_Error');
});

/* Start Application */
app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press ctrl-c to terminate.');
});