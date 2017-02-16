var socket =io();

socket.on('connect',function()  //which is fired when we successfully connect to the server
{
	console.log('connected to socket.io server');
});

socket.on('message',function(message) //which will listen 
{
	console.log('New message');
	console.log(message.text);
})