var socket = io();

//var moment = require('moment');

socket.on('connect', function() //which is fired when we successfully connect to the server
	{
		console.log('connected to socket.io server');
	});

socket.on('message', function(message) //way for the frontend to listen to the customised event,'message'
	{
		var momentTimestamp = moment.utc(message.timestamp); //too display tiimestamp in utc,not in locale time
		console.log(momentTimestamp.format()); //2017-02-16T13:18:20Z
		console.log(momentTimestamp.local().format()); //2017-02-16T23:18:20+10:00
		console.log(message.text);
		jQuery('.messages').append('<p><strong>'+momentTimestamp.local().format("h mm a")+' : </strong>'+message.text+'</p>');
	});

//socket.emi('message',{text:'Hello'}) - we give this in the consol log of browser

var $form = jQuery('#msgform');
$form.on('submit', function(event) {
	event.preventDefault();
	socket.emit('message',
	{
		text : $form.find('input[name=message]').val()
	});

	$form.find('input[name=message]').val('');
});