var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var moment = require('moment');
//var now = moment();

var http = require('http').Server(app); //anything that express app listens to, server also listens.
var io1 = require('socket.io')(http);


app.use(express.static(__dirname + '/public'));;

var clientInfo = {};

io1.on('connection', function(socket) {
	console.log('User connected via socket.io');

	socket.on('disconnect', function() {
		var userData = clientInfo[socket.id];
		if (typeof userData !== 'undefined') {
			socket.leave(userData.room);
			io1.to(userData.room).emit('message', {
				name: 'System',
				text: userData.name + ' has left!',
				timeStamp: moment().valueOf()

			});
			delete clientInfo[socket.id];
		}
	});

	socket.on('joinRoom', function(req) {
		socket.join(req.room);
		clientInfo[socket.id] = req;
		socket.broadcast.to(req.room).emit('message', //to everyone except the sender
			{
				name: 'System',
				text: req.name + ' has joined!',
				timestamp: moment().valueOf()
			});
	});

	socket.on('message', function(message) {
		console.log('Message received : ' + message.text);
		message.timestamp = moment().valueOf(); //gives javascript timestamp in ms.
		//socket.broadcast.emit('message', message);  // to send the message to evryone except the sender.
		//io1.emit('message', message); // to everyone
		io1.to(clientInfo[socket.id].room).emit('message', message); //to everyone in the room

		//io..emit - toeveryone
	});

	//timestamp property - javascript timestamp in milliseconds
	socket.emit('message', {
		name: 'System',
		text: 'Welcome to the chat application',
		timestamp: moment().valueOf()
	});
});


http.listen(PORT, function() {
	console.log('server started');
});