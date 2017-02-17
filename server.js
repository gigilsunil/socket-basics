var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var moment = require('moment');
//var now = moment();

var http = require('http').Server(app); //anything that express app listens to, server also listens.
var io1 = require('socket.io')(http);


app.use(express.static(__dirname + '/public'));;

io1.on('connection', function(socket) {
	console.log('User connected via socket.io');

	socket.on('message', function(message) {
		console.log('Message received : ' + message.text);
		message.timestamp = moment().valueOf(); //gives javascript timestamp in ms.
		//socket.broadcast.emit('message', message);  // to send the message to evryone except the sender.
		io1.emit('message', message); 

		//io..emit - toeveryone
	});

	//timestamp property - javascript timestamp in milliseconds
	socket.emit('message', {
		name: 'System',
		text: 'Welcome to the chat application',
		timestamp : moment().valueOf()
	});
});


http.listen(PORT, function() {
	console.log('server started');
});