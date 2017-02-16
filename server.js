var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();

var http = require('http').Server(app); //anything that express app listens to, server also listens.
var io = require('socket.io')(http);


app.use(express.static(__dirname + '/public'));;

io.on('connection', function(socket) {
	console.log('User connected via socket.io');

	socket.on('message', function(message) {
		console.log('Message received' + message.text);

		//socket.broadcast.emit('message', message);  // to send the message to evryone except the sender.
		io.emit('message', message); 

		//io..emit - toeveryone
	});
	socket.emit('message', {
		text: 'Welcome to the chat application'
	});
});


http.listen(PORT, function() {
	console.log('server started');
});