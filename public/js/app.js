var socket1 = io();
var name = getParamValuesByName('name');
var room = getParamValuesByName('room');

//var moment = require('moment');

socket1.on('connect', function() //which is fired when we successfully connect to the server
	{
		console.log(name + ' joined the ' + room);
		console.log('connected to socket.io server');
		jQuery('.room_title').text(room);
	});

socket1.on('message', function(message) //way for the frontend to listen to the customised event,'message'
	{
		var momentTimestamp = moment.utc(message.timestamp); //too display tiimestamp in utc,not in locale time
		console.log(momentTimestamp.format()); //2017-02-16T13:18:20Z
		console.log(momentTimestamp.local().format()); //2017-02-16T23:18:20+10:00
		console.log(message.text);
		var $message = jQuery('.messages');
		
		if(message.name  !== 'System')
		{
			$message.append('<p><strong><red>' + message.name +'</red> '+ momentTimestamp.local().format("h mm a") + ': </strong> </p> ');
		
		}
		
		$message.append('<p>'+ message.text + '</p>');
	});

//socket.emi('message',{text:'Hello'}) - we give this in the consol log of browser

var $form = jQuery('#msgform');
$form.on('submit', function(event) {
	event.preventDefault();
	var $mesage = $form.find('input[name=message]');
	socket1.emit('message', {
		text: $mesage.val(),
		name: name
	});

	$mesage.val('');
});