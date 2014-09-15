var express   = require('express'),
  http        = require('http'),
  restful     = require('node-restful'),
  mongoose    = restful.mongoose;

app = express()
  .use(express.bodyParser())
  .use(express.static('public'));

mongoose.connect('mongodb://XXX:XXX@server/DB');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Connected to Database");
});

var ShirtSchema = mongoose.Schema({
	_id:         String,
  Link:        String,
  Title:       String,
  DiggStoreId: Number,
  Slug:        String,
  Image:       String,
  Thumbs:      Number
});

var Shirts = restful.model('shirts', ShirtSchema);
Shirts.methods(['get', 'put', 'post', 'delete']);
Shirts.register(app, '/api/shirts');

app.get('/*', function  (req, res) {
	res.json(404, {status: 'Nobody here by that name.'});
});

http.createServer(app).listen(3001, function () {
  console.log("Server ready at http://localhost:3001");
});