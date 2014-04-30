var express = require('express'),
	mongoose = require('mongoose'),
	Emails = require('./app/models/emails'),
	bodyParser = require('body-parser'),
	exphbs  = require('express3-handlebars');

//var emails = new Emails();
//var cookieParser = require('cookie-parser');
mongoose.connect('mongodb://localhost:27017/node_emails');
var port = 3000;
var app = express();


app.use(bodyParser());
app.use(express.cookieParser());
app.use(express.cookieParser('hello baltimore :)'));
app.use(express.static(__dirname + '/app/client'));
//app.engine('handlebars', exphbs({defaultLayout: 'index'}));
//app.set('view engine', 'handlebars');
//app.set('views',__dirname + '/app/views');
//app.set('view options', { layout:false, root: __dirname + '/app/views' });

function isAuthenticated(req, res, next) {
	if (req.cookies.carto_collector)
		return next();

	// IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
	res.send('fail')
}


app.get('/', function(req, res) {
  res.render('/app/client/index.html', { title: 'The index page!' })
});

app.post('/addEmail', function(req, res){
  var email = new Emails({email: req.query.inputemail});
  Emails.find({"email": req.query.inputemail}, function(err, data){
  	if(err){
  		res.jsonp(err)
  	}
  	else{
  		if(data.length > 0){
  			res.jsonp({status: "This Email Already Exists"})
  		}
  		else{
  			email.save(function(err){
		  		if(err){
		  			res.jsonp(err)
		  		}
		  		else{
			  		res.jsonp({ status: 'Email has been added.' });
				}
		  	})
  		}
  	}
  })

});

app.post('/login', function(req, res, next){
	var user = req.query.inuser;
	var passphrase = req.query.inpassphrase;
	if ((user.toLowerCase() == 'fearcarto') && (passphrase == 'meridian will change web mapping')){
		res.cookie('carto_collector', { maxAge: 900000});
		res.jsonp('success')
	}
	else {
		res.jsonp('invalid')
	}
	
})

app.get('/byEmail', isAuthenticated, function(req, res){

  Emails.find(function(err, email){
  	if(err){
  		res.jsonp(err)
  	}
  	else{
  		console.log(email)
	  	res.jsonp(email);
	}
  })
  
});

app.get('/logout', function(req, res){
	res.clearCookie('carto_collector');
	res.send('loggedout')
})





app.listen(port);
console.log("Express server listening on port " + port);