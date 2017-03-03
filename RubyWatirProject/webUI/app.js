var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    path = require('path'),
    index = require('./routes/index.js'),
    routes = require('./routes/routes')(io);

app.set('views', __dirname+'/views');
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/public/*', function(req, res) {
  res.sendFile(__dirname + req.url);
});

app.get('/', index.index);
app.get('/database', index.database);
app.get('/getDbCollections', routes.getLoadValues);
app.get('/getPageElements', routes.getPageElements);

io.on('connection', function(socket){
  socket.on('message', function(msg){
    io.emit('consoleUpdate', msg);
  });
});

app.post('/createStoriesFromBacklog', routes.createStories);
app.post('/giveMeDatabaseValues', routes.databaseValues);
app.post('/createDatabaseValue', routes.createDatabaseValue);
app.post('/createActionObject', routes.createActionObject);
app.post('/runTheCasper', routes.runCasper);

app.get('*', function(req, res){
  res.status(404).send("404");
});

var port = Number(process.env.PORT || 8080);
http.listen(port, function(){
  console.log('Listening in on: '+port);
});
