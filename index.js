var restify = require('restify');
var restifyMongoose = require('restify-mongoose');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/directoryApi');

var server = restify.createServer({
  name: 'restify directory REST API',
  version: '1.0.0'
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

server.listen(4500, function () {
  console.log('%s listening at %s', server.name, server.url);
});