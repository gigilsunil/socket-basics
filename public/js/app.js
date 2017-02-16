var socket = io();

socket.on('connect', function() //which is fired when we successfully connect to the server
	{
		console.log('connected to socket.io server');
	});

socket.on('message', function(message) //way for the frontend to listen to the customised event,'message'
	{
		console.log('New message');
		console.log(message.text);
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