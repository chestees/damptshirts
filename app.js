var express   = require('express'),
  http        = require('http'),
  restful     = require('node-restful'),
  mongoose    = restful.mongoose,
  // bodyParser  = require('body-parser'),
  serveStatic = require('serve-static');

var db = mongoose.connection;
var app   = express();
var dbUrl = process.env.DATABASE_URL;

// app.use( bodyParser() );
app.use( serveStatic('public') );

mongoose.connect( dbUrl );

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Connected to Database");
} );

var ShirtSchema = mongoose.Schema({
	_id:         String,
  Link:        String,
  Title:       String,
  DiggStoreId: Number,
  Slug:        String,
  Image:       String,
  Thumbs:      Number
} );

var Shirts = restful.model( 'products3', ShirtSchema );
Shirts.methods( ['get', 'put', 'post', 'delete'] );
Shirts.register(app, '/api/shirts');

app.get('/*', function  (req, res) {
	res.json(404, {status: 'Nobody here by that name.'});
} );

http.createServer(app).listen(3001, function () {
  console.log("Server ready at http://localhost:3001");
} );