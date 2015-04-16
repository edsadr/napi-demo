var restify = require('restify');
var restifyMongoose = require('restify-mongoose');
var mongoose = require('mongoose');
var port = process.env.PORT || 4500;
var connectURL = process.env.MONGOURL || 'mongodb://localhost/directoryApi';

mongoose.connect(connectURL);

var server = restify.createServer({
  name: 'restify directory REST API',
  version: '1.0.1'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());


var DirectorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

var Directory = mongoose.model('directory', DirectorySchema);

restifyMongoose(Directory).serve('/api/directory', server);

server.get('/', function(req,res,next){
  res.end('ok !**');
});

server.listen(port, function () {
  console.log('%s listening at %s', server.name, server.url);
});