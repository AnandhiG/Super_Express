var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var expressValidator = require("express-validator");
var app = express();
/* Middleware Logging 

var logger = function(req,res,next){
	console.log("Logging....");
	next();
}
app.use(logger);
*/
//View Engine

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


/* Setup Middleware Bodyparse */
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false}));

//set static path
app.use(express.static(path.join(__dirname,'public'))) 

//Global Vars
app.use(function(req,res,next) {
	res.locals.errors = null;
	//console.log("Query String"+res.locals.query);
	//res.locals.query = null;
	next();
});

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
	  console.log(" form param" + formParam);
    }
	console.log(" form param 1" + formParam);
	console.log("root " + root);
	console.log("value" + value);
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
 var users = [
 {
	 first_name:'John',
	 last_name: 'Doe',
	 email:'johndoe@gmail.com',
	 
 },
 {
	 first_name:'Anan',
	 last_name: 'gane',
	 email:'anangane@gmail.com',
	 
 },
 {
	 first_name:'Bhu',
	 last_name: 'gane',
	 email:'bhugane@gmail.com',
	 
 }
 ]
/*  Pass JSON
var people = [
{
	name:'Jeff',
	age:30
},
{
	name:'Jeff1',
	age:20
},

{
	name:'Jeff2',
	age:40
}

	]
	*/
app.get("/",function(req,res){
	//res.send("Hello World hj");
	/* Parse JSON
	res.json(people);
	*/
	 console.log("base url in get " + req.baseUrl); 
	
	res.render('index', {title:"Customer",
	users:users});
	
})

app.post('/ana/add', function(req,res) {
	console.log("Form Submitted");
	console.log("base url in post " + req.baseUrl); 
	console.log(req.body.first_name);
	console.log(req.body.last_name);
	console.log(req.body.email);
	req.checkBody('first_name','First Name is Required').notEmpty();
	req.checkBody('last_name','Last Name is Required').notEmpty();
	req.checkBody('email','Email is Required').notEmpty();
	
	var errors = req.validationErrors();
	if(errors) {
		console.log('ERRORS');
		res.render('index', {
			title:"Customer",
			users:users,
			errors:errors
			}
		);
	}
	else {
	var newUser = {
		first_name : req.body.first_name,
		last_name :req.body.last_name,
		email : req.body.email
	}
	console.log(newUser);
	console.log('Success');
	}
})

app.listen(3000,function(){
console.log("Server Started on Port 3000...");
})